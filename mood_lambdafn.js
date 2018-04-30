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
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.fc0c436e-70c5-455e-a0f7-e74010a4fde5';

const SKILL_NAME = 'Mood';
const GET_MOOD =['How are you feeling?',
'What is your mood?',
'Please tell me your mood.',
'Can you help me understand your mood?'];
const HELP_MESSAGE = 'I can tell you something that resonates with your mood. just tell me what you feel like. For example sad or happy or heartbroken.';
const HELP_REPROMPT = 'What is your mood? ';
const STOP_MESSAGE = 'Take care and have a nice day!';
const SAD_QUOTES = ['A pearl is a beautiful thing that is produced by an injured life. It is the tear that results from the injury of the oyster. The treasure of our being in this world is also produced by an injured life. If we had not been wounded, if we had not been injured, then we will not produce the pearl. By Stephan Hoeller',
'Old friends pass away, new friends appear. It is just like the days. An old day passes, a new day arrives. The important thing is to make it meaningful: a meaningful friend — or a meaningful day. By Dalai Lama.',
"When you're sad, stop being sad and be awesome instead. By Barney Stinson", 
'Man is fond of counting his troubles, but he does not count his joys. If he counted them up as he ought to, he would see that every lot has enough happiness provided for it. By Fyodor Dostoevsky',
'Have patience with all things, but chiefly have patience with yourself. Do not lose courage in considering your own imperfections but instantly set about remedying them — every day begin the task anew. By Saint Francis de Sales.',
'One of the most tragic things I know about human nature is that all of us tend to put off living. We are all dreaming of some magical rose garden over the horizon — instead of enjoying the roses blooming outside our windows today. By Dale Carnegie',
'I like living. I have sometimes been wildly, despairingly, acutely miserable, racked with sorrow, but through it all I still know that just to be alive is a grand thing. By Agatha Christie',
'Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy. By Thich Nhat Hanh',
'In moments of discouragement, defeat, or even despair, there are always certain things to cling to. Little things usually: remembered laughter, the face of a sleeping child, a tree in the wind — in fact, any reminder of something deeply felt or dearly loved. No man is so poor as not to have many of these small candles. When they are lighted, darkness goes away — and a touch of wonder remains. By Tombstone inscription in Britain',
'Although the world is full of suffering, it is also full of the overcoming of it. By Helen Keller',
'All the adversity I’ve had in my life, all my troubles and obstacles, have strengthened me. You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you. By Walt Disney',
'Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover. By Mark Twain',
'The way I see it, if you want the rainbow, you gotta put up with the rain. By Dolly Parton',
'Now and then it’s good to pause in our pursuit of happiness and just be happy. By Guillaume Apollinaire',
'When you realize how perfect everything is, you will tilt your head back and laugh at the sky. By Buddha',
'Why are you trying so hard to fit in when you were born to stand out.',
'Everybody is going to hurt you . You just have to find the ones worth suffering for.',
"Accept sadness. Realise that without losing, winning isn't that great.",
"What if I fall? Oh, my darling, What if you fly?",
"Do not believe the things you tell yourself when you are sad and lonely.",
"Don't regret your choices. Even if they feel stupid now, at that point of time it was exactly what you thought was best and that is okay.",
"We can't direct the wind but we can adjust the sails",
    ];
    
const HAPPY_QUOTES = ["Be happy for this moment. This moment is your life. By Omar Khayyam.",
"Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy. By Norman Vincent Peale",
"Very little is needed to make a happy life; it is all within yourself, in your way of thinking. By Marcus Aurelius",
"Doing what you like is freedom. Liking what you do is happiness. By Frank Tyger",
"Keep doing your thing!",
"You rock!",
"You're doing an amazing job!",
"You're killing it out there!",
"Keep smiling beautiful.",
"Today is your day. Make the most of it.",
"Don't forget to do something that makes you smile today.",
"Deadpool your way through today.",
"You are a fabulous swan and don't let anyone tell you any different.",
"Don't let the haters kill your vibe.",
];

const HEARTBROKEN_QUOTES = ["Sometimes good things fall apart so that better things can fall together",
"Don't lose yourself trying to care about someone who doesn't care about losing you",
"Sometimes not getting what you want is a wonderful stroke of luck. By Dalai Lama",
"You will emerge from this nightmare like the powerful, beautiful, resilient person that you are. It can be hard to remember this when you feel like a shell of the person you were but trust me, you are capable of overcoming so much more than you think you can.", 
"There will be many chapters in your life. Don't get lost in the one you are in now.",
"Never allow someone to be your priority while you allowing yourself to be their option. By Mark Twain",
"Your value doesn't decrease just because someone failed to see your worth",
"You have been assigned this mountain to show others it can be moved.",
"You've always been good enough. You've just been giving the best parts of you to the wrong people. By r. h. Sin",
"Cry a river. Build a bridge and get over it.",
"You can't start the next chapter of your life if  you keep re-reading the last one",
"Nothing is more beautiful than a smile that has struggled through tears. By Demi Lovato",
];
//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const Greeting = ['How are you feeling?',
'What is your mood?',
'Please tell me your mood.',
'Can you help me understand your mood?'];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
function buildHandlers(event){
var handlers = {
    'LaunchRequest': function () {
        const greetingArr = Greeting;
        const greetingIndex = Math.floor(Math.random() * greetingArr.length);
        this.emit(':ask',greetingArr[greetingIndex]);
    },
    'promptMood': function () {
        const promptMood = GET_MOOD;
        const promptMoodInd = Math.floor(Math.random() * promptMood.length);
        const moodPrompt = promptMood[promptMoodInd];
     //   const speechOutput = GET_FACT_MESSAGE + randomFact;

    //    this.response.cardRenderer(SKILL_NAME, randomFact);
    //    this.response.speak(speechOutput);
    //    this.emit(':responseReady');
    this.emit(':ask',moodPrompt);
    },
    'getMood': function () {
        const userMood = event.request.intent.slots.mood.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        //event.request.intent.slots.mood.value;
        var quoteList = [];
        if (userMood=='sad') {
            quoteList = SAD_QUOTES;
        }
        else if (userMood=='happy')
        {
            quoteList = HAPPY_QUOTES;
        }
        else if (userMood=='heartbroken')
        {
            quoteList = HEARTBROKEN_QUOTES;
        }
        const quoteInd = Math.floor(Math.random() * quoteList.length);
        const finalQuote = quoteList[quoteInd];
        
     //   const speechOutput = GET_FACT_MESSAGE + randomFact;

    //    this.response.cardRenderer(SKILL_NAME, randomFact);
    //    this.response.speak(speechOutput);
    //    this.emit(':responseReady');
    this.emit(':tell',finalQuote);
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
return handlers;
};
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(buildHandlers(event));
    alexa.execute();
};
