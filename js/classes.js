class Rolf {
  isActive = false;
  rolfElement;
  hookElement;
  rolfPosition;
  mousePosition;
  browserWidth;
  rightBoundary;
  itemList;
  hookedItem;
  popupContainer;
  gameWrapper;

  constructor( targetDiv, hookDiv, popupDiv, list, gameContainer ) {
    // Populate list of fishable items
    this.itemList = list;

    // Populate reference and element variables
    this.gameWrapper = gameContainer;
    this.rolfElement = targetDiv;
    this.hookElement = hookDiv;
    this.popupElement = popupDiv;
    this.rolfPosition = 0;
    this.browserWidth = window.innerWidth;
    this.rightBoundary = this.browserWidth * .8;

    // Update mouse mouse position reference when mouse is moved
    this.gameWrapper.addEventListener( 'mousemove', e => {
      if ( this.isActive ){
        this.setMousePos( e.x );
      }
    } );

    // Update reference browser width on window resize
    window.addEventListener( 'resize', e => {
      if ( this.isActive ){
        this.setBrowserWidth( e.target.innerWidth );
      }
    } );

    // Sync rolfs position with the reference values every 100ms
    setInterval( () => this.move(), 100 );

    // Start fishing on click
    this.gameWrapper.addEventListener( 'click', () => {
      if ( this.isActive ){
        this.startFishing();
      }
    } );

    // Enable closing of info modal
    let closeInfoButton = this.popupElement.querySelector( '.closebutton' );

    closeInfoButton.addEventListener( 'click', () => toggleModal( this.popupElement ) );
  }

  enable() {
    this.isActive = true;
  }

  disable() {
    this.isActive = false;
  }

  setMousePos( mouseX ) {
    // Move rolf to the right edge of the screen if mouse has passed the rightBoundary
    if ( mouseX > this.rightBoundary ) {
      this.mousePosition = this.rightBoundary;
    } else {
      this.mousePosition = mouseX - ( window.innerWidth * .1 );
    }
  }

  setBrowserWidth( newWidth ) {
    // Update reference window width and boundary
    this.browserWidth = newWidth;
    this.rightBoundary = this.browserWidth * .8;

    // Move rolf if he is positioned outside of the window after resize
    if ( this.rolfPosition > this.rightBoundary ) {
      this.setRolfTransform( this.rightBoundary );
    }
  }

  setRolfTransform( transformValue ) {
    this.rolfElement.style.transform = `translate( ${ transformValue }px, -15% )`;
  }

  move() {
    if ( this.mousePosition ) {
      // Calculate distance between mouse and rolf
      let distX = this.mousePosition - this.rolfPosition;

      // Incrementally move rolf to the mouse position every iteration for a ease effect
      if( distX > 20 || distX < -20 ) {
        this.rolfPosition += distX / 5;
      }
      
      // restrict Rolf from moving past the left edge of the window
      if ( this.rolfPosition < ( window.innerWidth * .05 ) ) {
        this.setRolfTransform( 0 );
      } else {
        this.setRolfTransform( this.rolfPosition );
      }
    }
  }

  startFishing() {
    this.disable();
    this.hookElement.classList.add('is-fishing');
    this.hookItem( hookElement );
  }

  hookItem( parent ) {
    this.setHookedItem();
    this.assignPopupContent()

    let item = document.createElement('img');
    item.src = this.hookedItem.image;
    item.classList.add( 'hooked-item' );

    // Add the hooked item when the hook reaches its bottom position
    setTimeout( () => {
      parent.appendChild( item );

      // Reactivate character interactions and remove the hooked item when the animation is done
      setTimeout( () => {
        this.hookElement.classList.remove('is-fishing');
        this.popupElement.classList.add( 'is-showing' );
        parent.removeChild( item );
      }, 6200 );

    }, 4000 )
  }

  setHookedItem() {
    const randomIndex = randomNumber( this.itemList.length ) - 1;
    const randomItem = this.itemList[ randomIndex ];
    
    if ( randomItem === this.hookedItem ) {
      this.setHookedItem();
      return;
    }
    
    this.hookedItem = randomItem;
  }

  assignPopupContent() {
    let popupH3 = this.popupElement.querySelector( '#info-modal-h3' );
    let popupH1 = this.popupElement.querySelector( '#info-modal-h1' );
    let popupBody = this.popupElement.querySelector( '#info-modal-body' );
    let popupImage = this.popupElement.querySelector( '#info-modal-image' );
    let popupButton = this.popupElement.querySelector( '#CTA-button' );

    popupH3.innerHTML = this.hookedItem.h3;
    popupH1.innerHTML = this.hookedItem.h1;
    popupBody.innerHTML = this.hookedItem.text;
    popupImage.src = this.hookedItem.image;
    popupButton.href = this.hookedItem.button;
  }
}

// Class for generating an infinite stream of elements
class ElementGenerator {
  isActive = false;
  options;

  constructor( options ) {
    this.options = options;
  }

  start() {
    this.isActive = true;
    this.generateElements( this.options, true );
  }

  pause() {
    this.isActive = false;
  }

  generateElements( options, isFirst ) {
    const { minIntervalDelay, maxIntervalDelay } = this.options;
    let timeoutValue = isFirst ? 0 : randomNumber( maxIntervalDelay, minIntervalDelay );

    if ( this.isActive ) {
      setTimeout( () => {
        this.generateElement( this.options );
        this.generateElements( this.options );
      }, timeoutValue * 1000 );
    }
  }

  generateElement( { target, maxAnimationTime, minAnimationTime, imageSrc, numberOfImages, classes, refDirection,  maxDistance, minDistance, auxRefDirection, auxMaxDistance, auxMinDistance, maximumWidth, minimumWidth, positionUnit, auxPositionUnit, widthUnit } ) {
    let element = document.createElement( 'img' );
    let animationTime = randomNumber( maxAnimationTime, minAnimationTime );
    element.src = `${ imageSrc }${ randomNumber( numberOfImages ) }.svg`;
    element.classList.add( classes );
    element.style[ refDirection ] = `${ randomNumber( maxDistance, minDistance ) }${ positionUnit ? positionUnit : 'vw' }`;

    if ( auxRefDirection ) {
      element.style[ auxRefDirection ] = `${ randomNumber( auxMaxDistance, auxMinDistance ) }${ auxPositionUnit ? auxPositionUnit : 'vw' }`;
    }

    element.style.maxWidth = `${ randomNumber( maximumWidth, minimumWidth ) }${ widthUnit ? widthUnit : 'vmax' }`;
    element.style.animationDuration = `${ animationTime }s`;
    target.appendChild( element );
    this.removeFinishedElement( target, element, animationTime );
  }

  removeFinishedElement( parent, child, time ) {
    setTimeout( () => {
      parent.removeChild( child );
    }, time * 1000 )
  }
}