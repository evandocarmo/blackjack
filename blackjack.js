
class Card{
    constructor(suit, rank){
        this.rank = rank;
        this.suit = suit;
    }
}
class Deck{
   constructor(){
       this.cards = new Array();
       let suits = ["spades","diamonds","clubs","hearts"];
       for(let suit of suits){ //For every suit, generate 13 cards
           for(let rank = 1; rank < 14; rank++){
               this.cards.push(new Card(suit,rank));
           }
       }
       this.shuffle();
    }
    shuffle(){ //Knuth Algorithm
        let max = this.cards.length;
        for(let [index,card] of this.cards.entries()){//for every card...
            //select a random card that is equal or bigger to the current card
            let randomIndex = Math.floor(Math.random() * (max - index) + index);
            let temp = this.cards[randomIndex]; //swap them
            this.cards[randomIndex] = card;
            this.cards[index] = temp;
        }
    }
    draw(){
        return this.cards.splice(0,1)[0]; //remove first card from top and return
    }
}

class Player{
    constructor(){
        this.cards = new Array();
        this.points = 0;
    }
    decideMove(){//TODO ALLOW USER TO DECIDE
        let options = ["stand","hit"];
        return options[Math.floor(Math.random()*options.length)];
    }
}

class Dealer{
    constructor(){
        this.cards = new Array();
        this.points = 0;
    }
}

class Blackjack{
    constructor(){
        this.deck = new Deck();
        this.player = new Player();
        this.dealer = new Dealer();
    }
    deal(receiver = this.player,quantity = 1){ //default options deal 1 card to the player
        let card;
        for(let counter = 0; counter < quantity; counter++){
            card = this.deck.draw();//draw card
            if(card.rank === 1){ //if it's an ace...
                receiver.points += 11; //TODO ALLOW PLAYER TO SELECT
            }
            else if(card.rank > 10){//If it's a letter, it's add 10 points
                receiver.points += 10;
            }
            else{
                receiver.points += card.rank;
            }
            receiver.cards.push(card);
         }
         return card;
    }
    start(){
        this.deal(this.player,2);//player receives two cards
        console.log("player first hand",this.player.cards);
        this.deal(this.dealer,2);//so does dealer
        console.log("dealer's first card",this.dealer.cards[0]);//but only first is revealed
        while(this.player.points < 21){ //while the player hasn't busted
            let move = this.player.decideMove(); //player decides...
            console.log("player decided to ",move);
            if(move === "stand"){ //dealer's move
                console.log("dealer's move. The hole card was",this.dealer.cards[1]);
                while(this.dealer.points < 17){
                    console.log("less than 17. Dealer hits.");
                    this.deal(this.dealer);
                }
                console.log("house has more than 17. End of game");
                break;
            }
            else if(move === "hit"){
                let card = this.deal(this.player);//player draws one more card
                console.log("Player hits. Draws ",card,". Hand is now: ",this.player.cards);
            }
        }
        console.log("end of game - Player: ",this.player.cards,this.player.points," / House: ",this.dealer.cards,this.dealer.points);

        //PRINT RESULTS
        if(this.player.points === 21 && this.dealer.points === 21)
            console.log("Draw! Get your money back");
        else if(this.player.points === 21)
            console.log("Blackjack! You win!");
        else if (this.dealer.points === 21)
            console.log("Blackjack! The house wins!");
        else if (this.player.points > 21)
            console.log("Bust! You lose!");
        else if (this.dealer.points > 21)
            console.log("Bust! The house loses!");
        else if (this.player.points > this.dealer.points)
            console.log("You have more points than the house. You win!");
        else
            console.log("You have less points than the house. You lose!");

    }
}

let game = new Blackjack();
game.start();
