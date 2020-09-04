const blue = document.getElementById('blue'), 
      red = document.getElementById('red'), 
      orange = document.getElementById('orange'),
      green = document.getElementById('green'),
      StartBtn = document.getElementById('StartBtn'),
      LAST_LEVEL = 10

class Game {
  constructor() {
    this.inicializar = this.inicializar.bind( this )
    this.inicializar()
    this.generateSequence()
    setTimeout( () => {
        this.nextLevel()
    }, 500 )
  }

  inicializar() {
    this.nextLevel = this.nextLevel.bind( this )
    this.chooseColor = this.chooseColor.bind( this )
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
        blue,
        green,
        red,
        orange
    }
  }

  toggleBtnStart() {
      if (  StartBtn.classList.contains('hide') ) {
        StartBtn.classList.remove('hide')
      } else {
        StartBtn.classList.add('hide')
      }
  }

  generateSequence() {
      this.sequence = new Array( LAST_LEVEL ).fill( 0 ).map( n => Math.floor( Math.random() * 4 ))
  }

  nextLevel() {
      this.subLevel = 0
      this.illuminateSequence()
      this.addClickEvents()
  }

  changeNumToColor( num ) {
    switch ( num ) {
        case 0:
            return 'blue'
        case 1:
            return 'green'
        case 2:
            return 'red'
        case 3:
            return 'orange'
    }
  }

  changeColorToNum( color ) {
    switch ( color ) {
        case 'blue':
            return 0
        case 'green':
            return 1
        case 'red':
            return 2 
        case 'orange':
            return 3
    }
  }

  illuminateSequence() {
      for ( let i = 0; i < this.level; i++ ) {
        let color = this.changeNumToColor( this.sequence[ i ])
        setTimeout( () => this.illuminateColor( color ), 1000 * i )
      }
  }

  illuminateColor( color ) {
      this.colors[color].classList.add('light')
      setTimeout( () => this.turnOff( color ), 350 )
  }

  turnOff( color ) {
      this.colors[ color ].classList.remove('light')
  }

  addClickEvents() {
      this.colors.blue.addEventListener('click', this.chooseColor)
      this.colors.green.addEventListener('click', this.chooseColor)
      this.colors.red.addEventListener('click', this.chooseColor)
      this.colors.orange.addEventListener('click', this.chooseColor)
  }

  deleteEventsClick() {
    this.colors.blue.removeEventListener('click', this.chooseColor)
    this.colors.green.removeEventListener('click', this.chooseColor)
    this.colors.red.removeEventListener('click', this.chooseColor)
    this.colors.orange.removeEventListener('click', this.chooseColor)
  }

  chooseColor( ev ) {
    // console.log( this )
    const nameColor = ev.target.dataset.color
    const numColor = this.changeColorToNum( nameColor )
    this.illuminateColor( nameColor )
    if ( numColor === this.sequence[ this.subLevel ]) {
        this.subLevel++
        if ( this.subLevel === this.level ) {
            this.level++
            this.deleteEventsClick()
            if ( this.level === ( LAST_LEVEL +1 )) {
                // Won!!!
                this.wonGame()
            } else {
                setTimeout( this.nextLevel, 1500 )
            }
        }
    } else {
        // Lose!!!
        this.loseGame()
    }
  }

  wonGame() {
      swal( 'Frikerx', 'Congratulations, you won the game', 'success')
      .then( this.inicializar )
  }

  loseGame() {
    swal( 'Frikerx', 'Sorry, you lost :(', 'error')
    .then( () => {
        this.deleteEventsClick()
        this.inicializar()
    })
}
}

function startGame() {
   window.game = new Game()
}