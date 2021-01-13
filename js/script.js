// Enable navigation to and from the start-page
const journeyButtons = document.querySelectorAll( '.toggle-journey-button' );

journeyButtons.forEach( button => button.addEventListener( 'click', () => toggleJourney() ) );

// Enable closing of startup modal
const startupModal = document.querySelector( '.startup' );
const startupModalButton = startupModal.querySelector( '.closebutton' );

startupModalButton.addEventListener( 'click', () => toggleModal( startupModal ) );

// Enable info button
const infoButton = document.querySelector( '.info-button' );

infoButton.addEventListener( 'click', () => toggleModal( startupModal ) );

// Prevent back and info button from triggering rolf
const backButton = document.querySelector( '.game-back-button' );

backButton.addEventListener( 'click', e => e.stopPropagation() );
infoButton.addEventListener( 'click', e => e.stopPropagation() );

// Generate elements
const skyWrapper = document.querySelector( '.sky-wrapper' )
const oceanWrapper = document.querySelector( '.ocean-wrapper' )

// Construct the ElementGenerators
const generators = [];

createGenerator( generators, {
  target: skyWrapper,
  maxAnimationTime: 70,
  minAnimationTime: 50,
  imageSrc: 'Images/clouds/clouds',
  numberOfImages: 5,
  classes: 'cloud',
  refDirection: 'top',
  maxDistance: 15,
  maximumWidth: 20,
  minimumWidth: 10,
  positionUnit: 'vh',
  widthUnit: 'vmax',
  minIntervalDelay: 6,
  maxIntervalDelay: 8,
} );

// Generate the fishes
createGenerator( generators, {
  target: oceanWrapper,
  maxAnimationTime: 75,
  minAnimationTime: 35,
  imageSrc: 'Images/fishes/fish',
  numberOfImages: 5,
  classes: 'fish',
  refDirection: 'top',
  maxDistance: 45,
  minDistance: 5,
  maximumWidth: 6,
  minimumWidth: 3,
  positionUnit: 'vh',
  widthUnit: 'vw',
  minIntervalDelay: 8,
  maxIntervalDelay: 16,
} )

// Generate the bubbles
createGenerator( generators, {
  target: oceanWrapper,
  maxAnimationTime: 9,
  minAnimationTime: 5,
  imageSrc: 'Images/bubbles/bubbles',
  numberOfImages: 3,
  classes: 'bubbles',
  refDirection: 'top',
  maxDistance: 55,
  minDistance: 30,
  auxRefDirection: 'left',
  auxPositionUnit: 'vw',
  auxMaxDistance: 90,
  auxMinDistance: 5,
  maximumWidth: 15,
  minimumWidth: 7,
  positionUnit: 'vh',
  widthUnit: 'vw',
  minIntervalDelay: 4,
  maxIntervalDelay: 9,
} );

// Listen for game start or pause and act accordingly
const gameStartButton = document.querySelector( '#game-start' )
const gamePauseButton = document.querySelector( '#game-pause' )

gameStartButton.addEventListener( 'click', () => startGame() );
gamePauseButton.addEventListener( 'click', () => pauseGame() );

// Initialize the Rolf class and supply required data
const gameContainer = document.querySelector( '#game' );
const rolfElement = document.querySelector( '.rolf' );
const hookElement = document.querySelector( '.hook-container' );
const popupElement = document.querySelector( '.popup' );

const rolf = new Rolf( rolfElement, hookElement, popupElement, itemList, gameContainer );