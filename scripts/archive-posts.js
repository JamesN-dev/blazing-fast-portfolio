#!/usr/bin/env node

import { readdir, readFile, writeFile, mkdir, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const POSTS_DIR = join(__dirname, '../src/lib/posts');
const ARCHIVED_DIR = join(POSTS_DIR, 'archived');

// Helper to ask user questions
function askQuestion(question) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase().trim());
        });
    });
}

async function extractFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return null;

    const frontmatterText = match[1];
    const frontmatter = {};

    // Simple YAML parsing for basic key: value pairs
    const lines = frontmatterText.split('\n');
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();

        // Parse boolean values
        if (value === 'true') frontmatter[key] = true;
        else if (value === 'false') frontmatter[key] = false;
        else frontmatter[key] = value.replace(/^['"]|['"]$/g, ''); // Remove quotes
    }

    return frontmatter;
}

async function archivePosts() {
    try {
        console.log('🔍 Scanning for posts to archive...');

        // Ensure archived directory exists
        try {
            await mkdir(ARCHIVED_DIR, { recursive: true });
        } catch (e) {
            // Directory might already exist
            console.error('Error creating archived directory:', e);
        }

        // Read all markdown files in posts directory (not archived subfolder)
        const files = await readdir(POSTS_DIR);
        const markdownFiles = files.filter(file =>
            file.endsWith('.md') &&
            !file.startsWith('.') // Ignore hidden files
        );

        let movedCount = 0;
        const postsToArchive = [];
        const publishedPostsToArchive = [];

        // First pass: collect all posts that need archiving
        for (const file of markdownFiles) {
            const filePath = join(POSTS_DIR, file);
            const content = await readFile(filePath, 'utf-8');
            const frontmatter = await extractFrontmatter(content);

            if (!frontmatter) {
                console.log(`⚠️  No frontmatter found in ${file}, skipping`);
                continue;
            }

            // Check if post should be archived
            if (frontmatter.archived === true) {
                const archivedPath = join(ARCHIVED_DIR, file);

                // Check if file already exists in archived folder
                try {
                    await readFile(archivedPath, 'utf-8');
                    console.log(`📁 ${file} already exists in archived folder, skipping`);
                    continue;
                } catch {
                    // File doesn't exist in archived folder, proceed
                }

                postsToArchive.push({ file, filePath, content, frontmatter });

                // Track which archived posts are still published
                if (frontmatter.published !== false) {
                    publishedPostsToArchive.push(file);
                }
            }
        }

        // Ask about published posts before moving anything
        if (publishedPostsToArchive.length > 0) {
            console.log('\n⚠️  Found published posts marked for archiving:');
            publishedPostsToArchive.forEach(file => console.log(`   - ${file}`));
            console.log('\nThese posts are still visible on your blog (published: true)');

            const answer = await askQuestion('\nMove these published posts to archive folder anyway? (y/n): ');
            if (answer !== 'y' && answer !== 'yes') {
                console.log('❌ Archive operation cancelled');
                return;
            }
        }

        // Move all archived posts
        for (const { file, filePath, content } of postsToArchive) {
            const archivedPath = join(ARCHIVED_DIR, file);

            // Move file to archived folder
            await writeFile(archivedPath, content);
            await unlink(filePath);

            console.log(`📦 Moved ${file} to archived folder`);
            movedCount++;
        }

        if (movedCount === 0) {
            console.log('✅ No posts needed to be archived');
        } else {
            console.log(`✅ Successfully archived ${movedCount} post(s)`);
        }

    } catch (error) {
        console.error('❌ Error archiving posts:', error);
        process.exit(1);
    }
}

// Run the script
archivePosts();
