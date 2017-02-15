var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

function UpperControls (props) {
    return (
        <div className="col-lg-8 flex-container divider" style={{ width: 500 }}>
          <div className="btn-toolbar" role="toolbar" aria-label="...">
            <div className="btn-group left" role="group" aria-label="...">
              <a
                className="btn btn-default"
                href="#"
                data-toggle="tooltip"
                title="Start Over">
                <i
                  className="fa fa-refresh fa-lg"
                  aria-hidden="true"
                  onClick= { () => { props.rebuild() } }></i>
              </a>
            </div>
            <div className="btn-group" role="group" aria-label="...">
              <input
                type="text"
                className="form-control saveCtrl"
                value={props.saveName}
                onChange={ props.handleSaveName }/>
              <a className="btn btn-default" href="#" title="Save">
                <i
                  className="fa fa-floppy-o fa-lg"
                  aria-hidden="true"
                  onClick= { () => { props.createSnapshot()}}></i>
              </a>
            </div>
            <div className="btn-group right" role="group" aria-label="...">
              <p>Saved Levels
                <select className="savedSelect" onChange={ props.handleSavedLevel}>
                  <option className="savedNames" key={'blank'} value=""></option>									
                  { props.renderSavedLevelsList() }
                </select>
              </p>
            </div>
          </div>
        </div>
    )  
}

function Square (props) {
    return (
      <li 
        className={"flex-item " + props.val} 
        style={props.style}>
      </li>    
    )
}

function Board (props) {

  let renderSquares = () => {
    if (props.ready) {  
      return props.masterArray.map((val, index) => {
        // convert 'true' and 'false' values to their equivalent 'cave' and 'rock' counterparts
        // all other values in the array (e.g. health, weapon, nextDungeon etc) are already strings
        if (val === true) {
            val = 'cave';
        }
        else if (val === false) {
            val = 'rock'
        } 

        // check if this square should be lit up, or in darkness
        if (props.toggle === true) {				
            let showHideArray = props.showHide;				
            if (showHideArray.indexOf(index) === -1) {
                val += ' darkness'; 
            }			
        }
                    
        return <Square 
                 val={val}
                 style={props.style}
                 key={index} />
      });
    }
  }  
  
  return (
      <div className="gameboard">
          <ul 
              className="flex-container" 
              style={{width: props.width}}>
              {renderSquares()}
          </ul>
      </div>
  );
}

function Sidebar (props) {
  return (
      <div className="sidebar" style={{}}>
        <div className="header">
          <h3>STATUS</h3>
            <div style={{ width: 200 }}>
              <p className="labels"><strong>Dungeon</strong>: {props.dungeon}</p>
              <p className="labels"><strong>Health</strong>: {props.health}</p>
              <p className="labels"><strong>Weapon</strong>: {props.weapon} / {props.pickAxe}</p>
              <p className="labels"><strong>Attack</strong>: {props.attack}</p>
              <p className="labels"><strong>Pts until More Attack</strong>: {props.xp}</p>
            </div>
        </div>							
        <div className="header">
          <h3>LEGEND</h3>
          <ul className="flex-legend-container" style={{ width: 200 }}>
            <li className="legend">	<span className="flex-item flex-legend-item player" style={props.style}></span>
              <p className="legendTitle">Player</p></li>
            <li className="legend">	<span className="flex-item flex-legend-item health" style={props.style}></span>
              <p className="legendTitle">Health</p></li>
            <li className="legend"><span className="flex-item flex-legend-item enemy" style={props.style}></span>
              <p className="legendTitle">Enemy</p></li>
            <li className="legend"><span className="flex-item flex-legend-item weapon" style={props.style}></span>
              <p className="legendTitle">Weapon</p></li>
            <li className="legend"><span className="flex-item flex-legend-item pickAxe" style={props.style}></span>
              <p className="legendTitle">PickAxe</p></li>
            <li className="legend"><span className="flex-item flex-legend-item nextDungeon" style={props.style}></span>
              <p className="legendTitle">Next Dungeon Level</p></li>
            <li className="legend"><span className="flex-item flex-legend-item boss" style={props.style}></span>
              <p className="legendTitle">The Big Bad Boss (Level 4)</p></li>
          </ul>
        </div>
        <div className="header">
          <h3>Controls</h3>
          <div style={{ width: 200 }}>
            <label>
              <input 
                type="checkbox" 
                defaultChecked={props.toggle} 
                onChange = {props.handleToggleDarkness} />
              <span className="checkboxLabel">Toggle Darkness</span>
            </label>
          </div>
          <div style={{ width: 200 }}>
            <label>
              <input 
                type="checkbox" 
                defaultChecked={false} 
                onChange = {props.handleShowAdmin} />
              <span className="checkboxLabel">Admin Interface</span><br/>
              <span className="checkboxLabel_2">(see below)</span>
            </label>
          </div>                                
        </div>	
      </div>    
  )
}

function AdminPanel (props) {
  return (
      <div className="header showAdmin" style={{display: props.showAdmin }}>
          <h3>Admin Interface</h3>
          <div className="row header" style={{width: 400}}>
              <div className="col-xs-6">
                  <div className="input-group input-group-sm">
                      <span className="input-group-addon" id="sizing-addon3">Square Size</span>
                      <input
                          type="text"
                          className="form-control inputctrl"
                          value={props.squareSize}
                          onChange={props.handleSizeChange}
                          aria-describedby="sizing-addon3"/>
                  </div>
              </div>
              <div className="col-xs-6">
              </div>
          </div>
          <div className="row regRow" style={{width: 400}}>
              <div className="col-xs-4">
                  <div className="input-group input-group-sm">
                      <span className="input-group-addon" id="sizing-addon3">Rows</span>
                      <input
                          type="text"
                          className="form-control inputctrl"
                          value={props.numberOfRows}
                          onChange={props.handleRowChange}
                          aria-describedby="sizing-addon3"/>
                  </div>
              </div>
              <div className="col-xs-4">
                  <div className="input-group input-group-sm">
                      <span className="input-group-addon" id="sizing-addon3">Cols</span>
                      <input
                          type="text"
                          className="form-control inputctrl"
                          value={props.numberOfColumns}
                          onChange={props.handleColChange}
                          aria-describedby="sizing-addon3"/>
                  </div>
              </div>
          </div>  
      </div>     
  )
}

class Game extends React.Component {
  constructor () {
    super();

    // Local Storage initialization
    let savedLevels;
    if (localStorage['savedLevels']) {
        savedLevels = JSON.parse(localStorage["savedLevels"])
    } else {
        savedLevels = [];
    }

    this.state = {
      masterArray: [],
      numberOfRows: 50,
      numberOfColumns: 50,
      squareSize: 13,
      width: 0,
      special: [],
      specialLeft: [],
      specialRight: [],
      initialCaveFill: 0.92,
      maxNeighbor: 4,
      minNeighbor: 5,
      playerLocation: 0,                
      loopCount: 3,
      saveName: '',
      savedLevels: savedLevels,      
      health: 30,
      allEnemiesHealth: [ 20, 20, 20, 20, 20 ],
      allEnemiesLocation: [],
      dungeon: 1,
      xp: 60,
      xpCount: 1,
      weapon: 'Brass Knuckles',
      attack: 1,
      count: 0,
      pickAxe: '',
			toggle: true,           
      showHide: [],
      showAdmin: 'none', 
      ready: false            
    }

    this.move = this.move.bind(this);
    this.handleSaveName = this.handleSaveName.bind(this);
    this.handleSavedLevel = this.handleSavedLevel.bind(this);
    this.handleToggleDarkness = this.handleToggleDarkness.bind(this);
    this.handleShowAdmin = this.handleShowAdmin.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColChange = this.handleColChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    
  }

  componentWillMount () {
    this.rebuild();
  }

  componentDidMount() {
      let movePlayer = this.move;
      var listener = function (event) {
          let key = event.keyCode || event.charCode || 0;
          movePlayer(key);
      }
      window.addEventListener('keydown', listener, false)
  }

  componentWillUnmount() {
      clearInterval(this.state.intervalId);
      window.removeEventListener('keydown', listener, false);
  }  

  rebuild(reset) {
      let fn = _.debounce(() => {
          this.buildArray(this.state.numberOfRows, this.state.numberOfColumns, this.state.initialCaveFill, this.state.squareSize, reset)
      }, 300, {'leading': true});
      fn();
  }
  
  // create a list of 'special' squares eg. the left-most and right-most cols
  createSpecial(rows, cols) {
      let special = []
      let specialLeft = [];
      let specialRight = [];
      // build the reference array of 'special' squares
      for (let i = 0; i < rows; i++) {
          specialLeft.push(i * cols);
          specialRight.push((i * cols) + (cols - 1));
      }
      special = specialLeft.concat(specialRight);
      this.setState({
        special: special, 
        specialLeft: specialLeft, 
        specialRight: specialRight
      });
  }  

  // build the array of cave and rock squares
  buildArray(rows, cols, initialCaveFill, squareSize, reset) {

      // if there is a loop already running, cancel it
      clearInterval(this.state.intervalId);

      this.createSpecial(rows, cols);
      // set the width of the container. NOTE: 2px accounts for the border around the container
      let width = (cols * squareSize) + 2;	      

      let array = [];
      let total = rows * cols;
      let partial = (total * initialCaveFill); // initial number of squares that will be cave

      // build out the initial array which contains only 'false' (e.g. 'rock')
      array = Array(rows*cols).fill(false);

      // randomly assign 'true' (e.g. 'cave') to a fixed number of the squares
      for (let j = 0; j < partial; j++) {
          let index = Math.random() * total;
          index = Math.floor(index);
          array[index] = true;
      }

      this.setState({
        masterArray: array,
        width: width
      });

      // completely reset the game board and counters/values etc
      if (reset) {
          this.setState({
            loopCount: 3,
            health: 30,
            allEnemiesHealth: [ 20, 20, 20, 20, 20 ],
            allEnemiesLocation: [],
            dungeon: 1,
            xp: 60,
            xpCount: 1,
            weapon: 'Brass Knuckles',
            attack: 1,
            count: 0,
            pickAxe: '',
            showHide: [],
            ready: false
          })
      }

      var intervalId = setInterval(() => {
          this.nextMove(this.state.masterArray, cols);
      }, 0);

      this.setState({intervalId: intervalId});
  }

  nextMove(masterArray, cols) {

    var modified = masterArray.map((val, index) => {

        // count the number of surrounding cells that are "cave" cells (true)
        let count = 0;

        // index is NOT one of special indices
        if (this.state.special.indexOf(index) === -1) {
            // diagonal up to left
            if (masterArray[index - (cols + 1)]) { count++; }
            //up 
            if (masterArray[index - cols]) { count++; }
            // diagonal up to right
            if (masterArray[index - (cols - 1)]) { count++; }
            //left
            if (masterArray[index - 1]) { count++; }
            //right
            if (masterArray[index + 1]) { count++; }
            //diagonal down to left
            if (masterArray[index + (cols - 1)]) { count++; }
            // below
            if (masterArray[index + cols]) { count++; }
             // diagonal down to right
            if (masterArray[index + (cols + 1)]) { count++; }
          // index is a 'specialLeft' array member;	
        } else if (this.state.specialLeft.indexOf(index) > -1) {
            if (masterArray[index - cols]) { count++; }
            if (masterArray[index - (cols - 1)]) { count++; }
            if (masterArray[index + 1]) { count++; }
            if (masterArray[index + cols]) { count++; }
            if (masterArray[index + (cols + 1)]) { count++; }
          // a 'specialRight' array member;
        } else if (this.state.specialRight.indexOf(index) > -1) {
            if (masterArray[index - (cols + 1)]) { count++; }
            if (masterArray[index - cols]) { count++; }
            if (masterArray[index - 1]) { count++; }
            if (masterArray[index + (cols - 1)]) { count++; }
            if (masterArray[index + cols]) { count++; }
        }

        // if current square is a 'cave' cell check if it stays a 'cave' cell
        // based on the simple rule that to stay alive it must have more than 
        // 'maxNeighbor' surrounding it
        if (val == true) {
            if (count >= this.state.maxNeighbor) {
                return true;
            } else {
                return false;
            }
        }
        // if current square is a 'rock' cell check if it becomes a 'cave' cell
        if (val === false) {
            if (count > this.state.minNeighbor) {
                return true;
            } else {
                return false;
            }
        }
    })

    // If this move is the same as the last or has looped the required 'loopCount' amount
    if (_.isEqual(modified, masterArray) || this.state.loopCount <= 0) {

        clearInterval(this.state.intervalId);

        // Place all the items on the board
        this.placeItems('player', 1);
        this.placeItems('enemy', 5);
        this.placeItems('health', 7);
        this.placeItems('weapon', 1);
        if (this.state.dungeon === 1) {
            this.placeItems('pickAxe', 1)
        }
        if (this.state.dungeon < 4) {
            this.placeItems('nextDungeon', 1);
        }
        if (this.state.dungeon === 4) {
            this.placeItems('boss', 1)
        }
    
        // set which squares will show and which will be blacked out
        this.showHide(this.state.numberOfColumns, this.state.toggle);		

        // the board is ready
        this.setState ({
          ready: true
        })

    } else {
        this.setState({
          masterArray: modified,
          loopCount: this.state.loopCount - 1 
        });
    }
  }

  // These three functions convert an array to [x,y] coordinates
  // for ease of calculating the 'darkness' toggle
  convertFromIndex (cols, index) {
    index = index + 1;  // convert to non-zero based
    let y = Math.ceil(index / cols);
    let x = index - ( (y-1) * cols);
    let result = [x,y];
    return result;
  }

  convertToIndex (cols, x, y) {
    return x + ( y * cols) - 1; // convert back to zero based
  }

  indexMachine (cols, x, xStart, yStart, grid)  {
    let result = [];
    let maxX = (x + grid) > cols ? cols : (x + grid);
    while (xStart <= maxX) {
      result.push( this.convertToIndex(cols, xStart, yStart)); 
      xStart++;
    }
    return result	
  }		

  // deterimine what squares around the player should be 'lit'
	showHide ( cols, toggle) {
		let grid = 5;
		let playerLocation = this.state.playerLocation;

		// get the (x,y) location of the player
		let xy = this.convertFromIndex(cols, playerLocation);
		let x = xy[0];
		let y = xy[1];
    
		// from the player's location, find a spot within the 'grid' size to the left and above the player
		// that is still inside the bounds of the gameboard
		let xStart = (x - grid) > 0 ? (x - grid) : 1;
		let yStart = (y - grid) > 0 ? (y - (grid + 1)) : 0;

		// starting at the first row, calculate all the 'x' location's indices 
		// then increment to the next row and so on
		let arrays = [];
		while ( yStart < y + grid) {
			arrays.push(this.indexMachine(cols, x, xStart, yStart, grid));
			yStart++;
		}
		var merged = [].concat.apply([], arrays);
		this.setState({
			showHide: merged
		})
	}

  findRandom(quantity) {
      let index = Math.random() * quantity;
      index = Math.floor(index);
      return index;
  }

  placeItems(name, quantity) {
      let count = 1;
      let index = 0;

      while (count <= quantity) {
          // place the 'pickAxe' close to the Player's initial location
          if (name === 'pickAxe') {
              index = this.state.playerLocation + this.findRandom(8);
          }
          // all other items get randomly placed anywhere in the caves
          else {
              index = this.findRandom(this.state.masterArray.length);
          }
          
          // check if the random index is a 'cave' square (don't place items in 'rock')
          if (this.state.masterArray[index] === true) {
              count++ 
              let modified = this.state.masterArray;
              modified[index] = name;
              this.setState({masterArray: modified})

              if (name == 'player') {
                  this.setState({playerLocation: index})
              }

              if (name == 'enemy' || name == 'boss') {
                  let location = this.state.allEnemiesLocation;
                  location.push(index);
                  this.setState({allEnemiesLocation: location})
                  
                  if (name == 'boss') {
                    let enemyHealth = this.state.allEnemiesHealth;
                    enemyHealth.push(300);
                    this.setState({allEnemiesHealth: enemyHealth})						
                  }
              }
          }
      }
  }

  move(key) {
      let keyPressed = (val) => {
          let modified = this.state.masterArray;			
          let currentLocation = this.state.playerLocation;
          let newLocation = currentLocation + val;
          let whatIsHere = modified[newLocation]

          // check if it's an empty square (not rock, health, enemy etc)
          if (whatIsHere === true) {
              modified[currentLocation] = true;
              modified[newLocation] = 'player';
              this.setState({masterArray: modified, playerLocation: newLocation})
    
          // that's rock your hitting !!  Reduce health each swing of the pickAxe :)				
          } else if (whatIsHere === false && this.state.pickAxe == 'pickAxe') {
              let count = this.state.count;
              if (count < 5) {
                  this.setState({
                    health: this.state.health - 2,
                    count: count + 1
                  })
                  if (this.state.health <= 0) {
                    alert('You worked too hard getting through that wall. You died.')
                    this.rebuild(true)
                  }
              } else {
                  modified[currentLocation] = true;
                  modified[newLocation] = 'player';
                  this.setState({masterArray: modified, playerLocation: newLocation, count: 0})
              }
          
          } else if (whatIsHere === 'health') {
                modified[currentLocation] = true;
                modified[newLocation] = 'player';
                let health = this.state.health + 20;
                this.setState({masterArray: modified, playerLocation: newLocation, health: health})
            
          } else if (whatIsHere === 'pickAxe') {
                modified[currentLocation] = true;
                modified[newLocation] = 'player';
                this.setState({masterArray: modified, playerLocation: newLocation, pickAxe: 'pickAxe'})

          } else if (whatIsHere === 'weapon') {
              modified[currentLocation] = true;
              modified[newLocation] = 'player';
              let weapon = this.state.weapon;
              switch (weapon) {
                  case 'Brass Knuckles':
                      weapon = 'Dagger'
                      break;
                  case 'Dagger':
                      weapon = 'Pipe'
                      break;
                  case 'Pipe':
                      weapon = 'Sword'
                      break
              }
              this.setState({
                  masterArray: modified,
                  playerLocation: newLocation,
                  weapon: weapon,
                  attack: this.state.attack + 7
              })

          } else if (whatIsHere === 'nextDungeon') {
                let nextDungeonLevel = this.state.dungeon + 1;
                let result = this.state.allEnemiesHealth.map((val) => {
                  return nextDungeonLevel * 20;
                })
                this.setState({
                  loopCount: 3,
                  dungeon:nextDungeonLevel,
                  allEnemiesHealth: result,
                  allEnemiesLocation: [],
                  ready: false  // temporarily set ready state to false until next level is built
                })
                this.rebuild();                
                
          } else if (whatIsHere === 'enemy' || whatIsHere == 'boss') {
                let thisEnemiesLocation = this.state.allEnemiesLocation.indexOf(newLocation);
                let allEnemiesHealth = this.state.allEnemiesHealth;
                let thisEnemiesHealth = allEnemiesHealth[thisEnemiesLocation];
                let health = this.state.health;

              // Calculate Enemy and Player damage
              if (thisEnemiesHealth > 0) {
                  let damageToPlayer = 0;
                  let damageToEnemy = 0;
                  let randomDamage = Math.random();					
                  damageToPlayer = randomDamage * 10;
                  damageToPlayer = Math.floor(damageToPlayer) * this.state.dungeon;
                  damageToEnemy = randomDamage * 10;
                  damageToEnemy = Math.floor(damageToEnemy) * this.state.dungeon + Math.floor(this.state.attack * randomDamage);
                  thisEnemiesHealth -= damageToEnemy;
                  health -= damageToPlayer;
                  allEnemiesHealth[thisEnemiesLocation] = thisEnemiesHealth;
                  this.setState({
                    health: health, 
                    allEnemiesHealth: allEnemiesHealth
                  })
              }
              // Player wins fight
              if (thisEnemiesHealth <= 0 && whatIsHere == 'enemy') {
                  modified[currentLocation] = true;
                  modified[newLocation] = 'player';
                  // for each win, decrease xp required by 10 points
                  // if player has reached required xp, then increase attack by 12
                  let xp = this.state.xp;
                  let xpCount = this.state.xpCount;
                  let attack = this.state.attack;
                  if (xp > 10) {
                      xp -= 10;
                  } else {
                      xp = xpCount * 60;
                      xpCount = xpCount + 1;
                      attack += 12
                  }
                  this.setState({
                    masterArray: modified, 
                    playerLocation: newLocation, 
                    xp: xp, 
                    xpCount: xpCount, 
                    attack: attack
                  })
              }

              // Player WINS GAME
              if (thisEnemiesHealth <= 0 && whatIsHere =='boss') {
                  alert (' You have won the game!  Congratulations')
                  this.rebuild(true)					
              }				
              // Player LOSES GAME
              if (health <= 0) {
                  alert('You died in Battle. Try again');
                  this.rebuild(true)
              }
          }
          
          this.showHide(this.state.numberOfColumns, this.state.toggle);		
      }

      // If player presses left, up, right, or down key respectively
      // ONLY activate once the board is setup !
      if ( this.state.ready) {
          if (key == '37') {
            keyPressed(-1);
          } else if (key == '38') {
            keyPressed(-50);
          } else if (key == '39') {
            keyPressed(1);
          } else if (key == '40') {
            keyPressed(50);
          }
      }
  }

  // Use local storage to create 'saved dungeons'
  setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
  }

  // create a snapshot of the dungeon and also add the name to the list of saved dungeons
  createSnapshot() {
      // when a user saves a dungeon
      // add the 'save_name' and associated snapshot to localStorage
      let snapshot = [ this.state.masterArray, {
        playerLocation: this.state.playerLocation,
        health: this.state.health,
        allEnemiesHealth: this.state.allEnemiesHealth,
        allEnemiesLocation: this.state.allEnemiesLocation,
        dungeon: this.state.dungeon,
        xp: this.state.xp,
        xpCount: this.state.xpCount,
        weapon: this.state.weapon,
        attack: this.state.attack,
        count: this.state.count,
        pickAxe: this.state.pickAxe,
        showHide: this.state.showHide,
        toggle: this.state.toggle
      }				
    ];
      this.setItem(this.state.saveName, snapshot);

      // additionally, add the 'save_name' to an array of saved dungeons to easily
      // render the list in the dropdown.
      let savedLevels = [];

      if (localStorage['savedLevels']) {
          savedLevels = JSON.parse(localStorage["savedLevels"])
          savedLevels.push(this.state.saveName);
      } else {
          savedLevels.push(this.state.saveName);
      }

      this.setItem('savedLevels', savedLevels);

      this.setState({savedLevels: savedLevels})
  }

  handleSizeChange(event) {
      let width = this.state.numberOfColumns * event.target.value + 2;
      let squareSize = Number(event.target.value);

      let fn = _.debounce(() => {
          this.setState({
              width: width,
              squareSize: squareSize
          })
      }, 300,{'leading':true});
      fn();
  }

  handleRowChange(event) {
      this.setState({
          numberOfRows: Number(event.target.value)
      })
      this.rebuild(true);
  }

  handleColChange(event) {
      this.setState({
          numberOfColumns: Number(event.target.value)
      })
      this.rebuild(true);
  }

  handleToggleDarkness(event) {
      this.setState({toggle: !this.state.toggle})
  }

  handleShowAdmin(event) {
      if (this.state.showAdmin =='none') {
          this.setState({showAdmin: 'inherit'})
      }
      else {
          this.setState({showAdmin: 'none'})
      }        
  }

  handleSaveName(event) {
      this.setState({saveName: event.target.value})
  }

  handleSavedLevel(event) {
      let item = JSON.parse(localStorage.getItem(event.target.value));
      let boardContents = item[0];
      let values = item[1];
      
      this.setState({
          masterArray: boardContents,
          playerLocation: values.playerLocation,
          health: values.health,
          allEnemiesHealth: values.allEnemiesHealth,
          allEnemiesLocation: values.allEnemiesLocation,
          dungeon: values.dungeon,
          xp: values.xp,
          xpCount: values.xpCount,
          weapon: values.weapon,
          attack: values.attack,
          count: values.count,
          pickAxe: values.pickAxe				
    })
  }      

  renderSavedLevelsList() {
      return this.state.savedLevels.map((listValue, index) => {
          return (
              <option className="savedNames" key={index} value={listValue}>
                  {listValue}
              </option>
          )
      })
  }  

  render () {
      return (
          <div>
              <div className="flex-container noborder">
                  <h1 className="left">Dungeon Crawler</h1>
              </div>
              <UpperControls 
                  rebuild = { () => this.rebuild(true) }                  
                  saveName = {this.state.saveName}
                  handleSaveName = { this.handleSaveName }
                  handleSavedLevel = { () => this.handleSavedLevel }
                  createSnapshot = { () => this.createSnapshot() }
                  renderSavedLevelsList = { () => this.renderSavedLevelsList () }
                  />
              <div className="grid">
                  <div className = "col-xs-12">                  
                    <Board 
                        ready = {this.state.ready}
                        masterArray={this.state.masterArray}
                        toggle={this.state.toggle}
                        showHide={this.state.showHide}
                        squareSize={this.state.squareSize}
                        width={this.state.width}
                        style = {{width: this.state.squareSize, height: this.state.squareSize}}

                        />
                    <Sidebar 
                        health= {this.state.health}
                        weapon = {this.state.weapon}
                        pickAxe = {this.state.pickAxe}
                        attack  = {this.state.attack}
                        xp  = {this.state.xp}
                        dungeon = {this.state.dungeon}
                        style = {{width: this.state.squareSize, height: this.state.squareSize}}
                        toggle  = {this.state.toggle}
                        handleToggleDarkness = {this.handleToggleDarkness}
                        handleShowAdmin = {this.handleShowAdmin}/>
                  </div> 
              </div>
              <AdminPanel 
                  showAdmin = {this.state.showAdmin}
                  squareSize = {this.state.squareSize}
                  numberOfRows = {this.state.numberOfRows}
                  numberOfColumns = {this.state.numberOfColumns}
                  handleRowChange = {this.handleRowChange}
                  handleColChange = {this.handleColChange}
                  handleSizeChange = {this.handleSizeChange}/>
          </div>            
      );
  }
}

function App () {
    return (
        <div>
            <Game />   
        </div>            
    );
}

ReactDOM.render(
    <App/>, document.getElementById("container"));