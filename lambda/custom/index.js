/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Random Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a random fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//Facts taken from https://thoughtcatalog.com/jacob-geers/2016/04/really-funny-random-weird-facts/ and https://www.thefactsite.com/2011/07/top-100-random-funny-facts.html
//=========================================================================================================================================
const data = [
    'Banging your head against a wall burns 150 calories an hour.',
    'In the UK, it is illegal to eat mince pies on Christmas Day.',
    'When hippos are upset, their sweat turns red.',
    'A flock of crows is known as a murder.',
    'Facebook Addiction Disorder is a mental disorder identified by Psychologists.',
    'Cherophobia is the fear of fun.',
    'Human saliva has a boiling point three times that of regular water.',
    'If you lift a kangaroos tail off the ground it can\'t hop',
    'Bananas are curved becausee they grow towards the sun.',
    'Billy goats urinate on their own heads to smell more attractive to females.',
    'The person who invented the Frisbee was cremated and made into a frisbee after he died.',
    'During your lifetime, you will produce enough saliva to fill two swimming pools.',
    'If they lived in the same place Polar bears would be able to eat as many as 86 penguins in a single sitting.',
    'Movie trailers were originally shown after the movie, which is why they were called “trailers”.',
    'An eagle can kill a young deer and fly away with it.',
    'Heart attacks are more likely to happen on a Monday.',
    'If you consistently fart for 6 years & 9 months, enough gas is produced to create the energy of an atomic bomb!',
    'in 2015, more people were killed from injuries caused by taking a selfie than by shark attacks.',
    'A lion\'s roar can be heard from 5 miles away.',
    'You cannot snore and dream at the same time.',
    'The following can be read forward and backwards: Do geese see God?',
    'A baby octopus is about the size of a flea when it is born.',
    'In Uganda, 50% of the population is under 15 years of age.',
    'Hitler’s mother considered abortion but the doctor persuaded her to keep the baby.',
    'Recycling one glass jar saves enough energy to watch TV for 3 hours.',
    'Smearing a small amount of dog feces on an insect bite will relieve the itching and swelling.',
    'Catfish are the only animals that naturally have an odd number of whiskers.',
    'Facebook, Skype and Twitter are all banned in China.',
    'The Titanic was the first ship to use the SOS signal.',
    'In Poole, a store called ‘Pound World’ went out of business because of a store across the road called ’99p Stores’, which was selling the same products but for just 1 pence cheaper.',
    'About 8,000 Americans are injured by musical instruments each year.',
    'The French language has seventeen different words for ‘surrender’.',
    'Nearly three percent of the ice in Antarctic glaciers is penguin urine.',
    'Bob Dylan’s real name is Robert Zimmerman.',
    'Crocodiles can\'t poke their tounges out',
    'Sea otters hold hands when they sleep so they don’t drift away from each other.',
    'A small child could swim through the veins of a blue whale.',
    'Bin Laden’s death was announced on 1st May 2011. Hitler’s death was announced on 1st May 1945.',
    'J.K. Rowling chose the unusual name ‘Hermione’ so young girls wouldn’t be teased for being nerdy.',
    'Hewlett-Packard’s name was decided in a coin toss.',
    'The total number of steps in the Eiffel Tower are 1665.',
    'The Pokémon Hitmonlee and Hitmonchan are based off of Bruce Lee and Jackie Chan.',
    'An arctophile is a person who collects, or is very fond of teddy bears.',
    'Pirates wore earrings because they believed it improved their eyesight.',
    'Los Angeles’s full name is El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula.',
    'The Twitter birds name is Larry.',
    'Octopuses have four pairs of arms.',
    'In England, in the 1880’s, “Pants” was considered a dirty word.',
    'It snowed in the Sahara desert for 30 minutes on the 18th February 1979.',
    'Every human spent about half an hour as a single cell.',
    'Unlike many other big cats, snow leopards are not aggressive towards humans. There has never been a verified snow leopard attack on a human being.',
    'The first alarm clock could only ring at 4am.',
    'Birds don’t urinate.',
    'Dying is illegal in the Houses of Parliaments.',
    'The most venomous jellyfish in the world is named the Irukandji and is smaller than your fingernail.',
    'Slugs have 4 noses.',
    'Panphobia is the fear of everything.',
    'The front paws of a cat  are different from the back paws. They have five toes on the front but only four on the back.',
    'Most toilets flush in E flat.',
    'A raisin dropped in a glass of fresh champagne will bounce up and down continuously from the bottom of the glass to the top.',
    'Cap’n Crunch’s full name is Horatio Magellan Crunch.',
    'The Vatican City is the country that drinks the most wine per capita at 74 liters per citizen per year.',
    'Approximately 40,000 Americans are injured by toilets each year.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
