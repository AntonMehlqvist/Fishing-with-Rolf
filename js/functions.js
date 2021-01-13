const randomNumber = ( max, min ) => {
  return Math.ceil( Math.random() * ( max - ( min ? ( min + 1 ) : 0 ) ) ) + ( min ? ( min - 1 ) : 0 );
}

const toggleModal = ( popupElement ) => {
  popupElement.classList.toggle( 'is-showing' );

  setTimeout( () => rolf.enable(), 100 );
}

const toggleJourney = () => {
  const startPage = document.querySelector( '#start' );
  const gameSection = document.querySelector( '#game-section' );
  const bodyElement = document.querySelector( 'body' );

  if ( gameSection.classList.contains( 'hidden' ) ) {
    gameSection.classList.remove( 'hidden' );
    bodyElement.classList.add( 'scroll-lock' );
    return;
  }

  setTimeout( () => {
    gameSection.classList.add( 'hidden' );
    bodyElement.classList.remove( 'scroll-lock' );
  }, 1000 )
}

const createGenerator = ( collection, options ) => {
  const newGenerator = new ElementGenerator( options );
  collection.push( newGenerator )
}

// Enable start and pause of item generators
const startGame = () => {
  generators.forEach( generator => generator.start() );
}

const pauseGame = () => {
  generators.forEach( generator => generator.pause() );
}