let circleTurn,user1,user2,user_c,compTurn
const x = 'x'
const circle = 'circle'
const win = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]
const win_msg = document.querySelector(".win")
const win_con = document.querySelector(".winning_msg")
const btn = document.querySelectorAll('.btn')
const multi_name_con = document.querySelector(".multi_name_con")
const select_con = document.querySelector(".select_con")
const start = document.querySelector('.start')
const cells = document.querySelectorAll(".cell")
const board = document.querySelector(".board")
const match_con = document.querySelector(".match_con")
const user = document.querySelector(".user")
let match_msg = document.querySelector(".match_msg")
const comp = document.querySelector(".comp")
let array_index = [0,1,2,3,4,5,6,7,8]


{
	multi_name_con.style.display = "none"
	match_con.style.display = "none"
}

// common for both

btn.forEach((element) => {
	element.addEventListener('click' , () => {
		option = element.innerHTML
		multi_name_con.style.display = "flex"
		select_con.style.display = "none"

		if(option === 'VS COMPUTER'){
			user.style.display = 'none'
			comp.style.display = 'block'
		}
		else if(option === 'MULTIPLAYER'){
			user.style.display = 'block'
			comp.style.display = 'none'
		}
	})
})

start.addEventListener('click' , () =>{
	if(option === 'MULTIPLAYER') {
		user1 = document.querySelector('.user1')
		user2 = document.querySelector('.user2')
		if(user1.value !=""  && user2.value != ""){
			multi_name_con.style.display = "none"
			match_con.style.display = "block"
			match_msg.innerHTML = user1.value.toUpperCase() + " VS " + user2.value.toUpperCase()
			startGame()
		}
		else 
			alert("Enter name of both the players")
	}

	else{
		user_c = document.querySelector('.user_comp')
		if(user_c.value !== ""){
			multi_name_con.style.display = "none"
			match_con.style.display = "block"
			match_msg.innerHTML = user_c.value.toUpperCase() + " VS COMPUTER" 
			startGame2()
		}
		else
			alert("Enter your name")
	}
})


// for multiplayer

function startGame(){
	circleTurn = false
	cells.forEach(element =>{
		element.classList.remove(x)
		element.classList.remove(circle)
		element.removeEventListener('click' , handleClick)
		element.addEventListener('click' , handleClick, {once:true})
	})
	setHover()
	win_con.style.display = "none"
}


function handleClick(e){
	const cell = e.target
	const current = circleTurn ? circle : x
	putItem(cell,current)
	if(checkWin(current))
		endGame(false)
	else if(isdraw(current))
		endGame(true)
	else{
		switchTurn()
		setHover()
	}
}

function putItem(cell,current){
	cell.classList.add(current)
}

function switchTurn(){
	circleTurn = !circleTurn
}

function setHover(){
	board.classList.remove(x)
	board.classList.remove(circle)
	if(circleTurn)
		board.classList.add(circle)
	else 
		board.classList.add(x)
}

// for vs computer

function startGame2(){
	array_index = [0,1,2,3,4,5,6,7,8]
    compTurn = false
    cells.forEach((element) => {
		element.classList.remove(x)
		element.classList.remove(circle)
		element.removeEventListener('click' , handleClick2)
        element.addEventListener('click', handleClick2, {once:true} )
	setHover2()
	win_con.style.display = "none"
	})
}

function handleClick2(e){
	const cell = e.target
	index = parseInt(cell.getAttribute("num"))
	if(!cell.classList.contains(circle) && !compTurn){
		cell.classList.add(x)
		
		if(checkWin(x))
			endGame(false)

		else if(isdraw())
			endGame(true)
		
		else{
			index_actual = findIndex(index)
			array_index.splice(index_actual,1)
			compTurn = true
		}
	}
	computerTurn()
}

function setHover2(){
	if(!compTurn)
		board.classList.add(x)
}

function computerTurn(){
	if(compTurn){
		len = array_index.length
		val = Math.floor(Math.random() * len)
		i = array_index[val]
		cells[i].classList.add(circle)
		array_index.splice(val,1)
		if(checkWin(circle))
			endGame(false)
		compTurn = false
	}
}

function findIndex(num){
	for(i=0;i<array_index.length;i++){
		if(array_index[i] === num)
			return i
	}
}

// common for both

function checkWin(current){
	return win.some(combination => {
		return combination.every(index => {
			return cells[index].classList.contains(current)
		})
	})
}

function isdraw(){
	return [...cells].every(element => {
		return element.classList.contains(x) || element.classList.contains(circle)
	})
}

document.querySelector('.restart').addEventListener('click' , () => {
	if(option === 'MULTIPLAYER')
		startGame()
	else 
		startGame2()
})

function endGame(draw) {
	if(draw)
		win_msg.innerHTML = "It's a draw!"
	else{
		if(option === 'MULTIPLAYER')
			win_msg.innerHTML = `${circleTurn ? user2.value.toUpperCase() : user1.value.toUpperCase()} Wins!`
		else 
			win_msg.innerHTML = compTurn ? "Computer Wins" : "You Won"
	}
	win_con.style.display = "flex"
}