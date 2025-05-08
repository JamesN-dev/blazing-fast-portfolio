<script>
  // Import any necessary components or images
</script>

<div class="heroContent">
  <div class="content-wrapper">
    <h1 class="intro-text">Hi, my name is</h1>
    <h1 class="name">James Niemerg.</h1>
    <h1 class="tagline">Blazing Fast Design.</h1>
    <p class="description">
      I am a marketing professional, developer, and visual designer specializing in web
      development. I like to build blazing fast and responsive user experiences on the web.
    </p>
  </div>
  <div class="frame-16">
    <a href="/about" class="buttonStrokeGruvDarkOrange">
      <span>Follow Me</span>
    </a>
    <a href="/contact" class="buttonGruvBlue">
      <span>Let's Collaborate!</span>
    </a>
  </div>
</div>

<style>
  .heroContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
    position: absolute;
    height: 250px;
    left: 304px;
    right: 660px;
    top: calc(50% - 414px/2 + 34px);
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    width: 764px;
    height: 440px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .intro-text {
    font-family: 'Kilimanjaro Sans Round1', sans-serif;
    font-size: var(--h6);
    color: var(--gruv-yellow);
    margin: 0;
    font-weight: 400;
  }

  .name, .tagline {
    width: 764px;
    font-family: 'Kilimanjaro Sans Round1';
    font-style: normal;
    font-weight: 400;
    font-size: 100px;
    line-height: 115%;
    display: flex;
    align-items: flex-end;
    margin: 0;
  }

  .name {
    background: linear-gradient(180deg, #FFFFFF 5%, #999999 31.54%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    background: linear-gradient(180deg, #FFF4DB 10%, #999283 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .description {
    font-size: var(--p);
    font-family: 'Nunito Sans', sans-serif;
    color: #FFF4DB; /* Using direct hex value instead of CSS variable */
    line-height: 1.6;
    margin-bottom: var(--space-4);
    max-width: 764px;
  }

  .frame-16 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 24px;
    width: 764px;
    height: 66px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }

  /* Button styling */
  .buttonStrokeGruvDarkOrange {

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 370px;
    height: 44px;
    border: 1.5px solid #A13B1E;
    border-radius: 9px;
    flex: none;
    order: 0;
    flex-grow: 1;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .buttonStrokeGruvDarkOrange span {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 160%;
    color: #FFF4DB;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .buttonStrokeGruvDarkOrange:hover {
    background: #811F1F;
  }

  .buttonStrokeGruvDarkOrange:hover span {
    color: #CCC2AB;
  }

  .buttonStrokeGruvDarkOrange:focus {
    background: #A13B1E;
    border: 1.25px solid #FBBD2E;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .buttonGruvBlue {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 370px;
    height: 44px;
    background: #458588;
    border-radius: 9px;
    flex: none;
    order: 1;
    flex-grow: 1;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .buttonGruvBlue span {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 160%;
    color: #FFF4DB;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .buttonGruvBlue:hover {
    background: #255658;
  }

  .buttonGruvBlue:hover span {
    color: #CCC2AB;
  }

  .buttonGruvBlue:focus {
    background: #458588;
    border: 1.25px solid #FBBD2E;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  /* Responsive styles */
  @media (max-width: 1400px) {
    .heroContent {
      position: relative;
      left: auto;
      right: auto;
      top: auto;
      height: auto;
      width: 90%;
      max-width: 764px;
      margin: 120px auto 0;
    }
    
    .content-wrapper {
      width: 100%;
      height: auto;
    }
    
    .name, .tagline {
      width: 100%;
      height: auto;
      font-size: 80px;
    }
    
    .frame-16 {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 800px) {
    .name, .tagline {
      font-size: 50px;
    }
    
    .frame-16 {
      flex-direction: column;
      gap: 16px;
      height: auto;
    }
    
    .buttonStrokeGruvDarkOrange, .buttonGruvBlue {
      width: 100%;
    }
  }
</style>
