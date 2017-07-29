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
       for(let suit of suits){
           for(let rank = 1; rank < 14; rank++){
               this.cards.push(new Card(suit,rank));
           }
       }
       this.shuffle();
    }
    shuffle(){
        console.time(`shuffling`);
        let max = this.cards.length;;
        for(let [index,card] of this.cards.entries()){
            let randomIndex = Math.floor(Math.random() * (max - index) + index);
            let temp = this.cards[randomIndex];
            this.cards[randomIndex] = card;
            this.cards[index] = temp;
        }
        console.timeEnd(`shuffling`);
    }
    draw(){
        return this.cards.splice(0,1)[0];
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
    deal(receiver = this.player,quantity = 1){
        for(let counter = 0; counter < quantity; counter++){
            let card = this.deck.draw();
            if(card.rank === 1){
                console.log(`Ace! Select 1 or 11?`);
                receiver.points += 11; //TODO ALLOW PLAYER TO SELECT
            }
            else if(card.rank > 10){
                receiver.points += 10;
            }
            else{
                receiver.points += card.rank;
            }
            receiver.cards.push(card);
         }
    }
    start(){
        this.deal(this.player,2);
        console.log("player first hand",this.player.cards);
        this.deal(this.dealer,2);
        console.log("dealer's first card",this.dealer.cards[0]);
        while(this.player.points < 21){
            let move = this.player.decideMove();
            console.log("player decided to ",move);
            if(move === "stand"){
                console.log("dealer's move. The house hand: ",this.dealer.cards);
                while(this.dealer.points < 17){
                    console.log("less than 17. Dealer hits.");
                    this.deal(this.dealer);
                }
                console.log("house has more than 17. End of game");
                break;
            }
            else if(move === "hit"){
                let card = this.deal(this.player);
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
