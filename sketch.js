// create markov model
// arg needs to be between 2 - 7, 2 is most chaotic, 7+ will really just recreate the text
let rm = RiTa.markov(3, {maxAttempts: 20000, maxLengthMatch: 7});

// find some data (Text of Bar)
let data = document.getElementById("source").innerText;

// train the model
rm.addText(data);

function preload() {
    result = loadStrings('');
}

function setup(){
    button = createButton('Click for new lyrics');
    button.position(425, 65);
    button.mousePressed(generateNewLyrics);

    // generate 3 stanzas of 4 lines
    let lines = processGeneratedLines(rm.generate(2));
    let lines2 = processGeneratedLines(rm.generate(2));
    let lines3 = processGeneratedLines(rm.generate(2));
    let lines4 = processGeneratedLines(rm.generate(2));
    let lines5 = processGeneratedLines(rm.generate(2));
    let lines6 = processGeneratedLines(rm.generate(2));

    // find the letter div
    let letter = select("#letter");

    // add elements to the DOM
    letter.child(createP("<em>Here are your randomly generated Rich Hoyt lyrics</em>"));
    letter.child(createP("<br>")); // break before first stanza

    // first stanza
    addLinesToDOM(letter, lines);
    addLinesToDOM(letter, lines2);

    letter.child(createP("<br>")); // break between first and second stanza

    // second stanza
    addLinesToDOM(letter, lines3);
    addLinesToDOM(letter, lines4);

    letter.child(createP("<br>")); // break between second and third stanza

    // third stanza
    addLinesToDOM(letter, lines5);
    addLinesToDOM(letter, lines6);
}

function processGeneratedLines(lines) {
    return lines.map(line => processGeneratedText(line));
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function processGeneratedText(text) {
    // Split the text into sentences
    let sentences = text.split(/([.!?])/).filter(Boolean);  // This keeps the punctuation as separate elements

    // Capitalize the first word of each sentence
    for (let i = 0; i < sentences.length; i += 2) {
        sentences[i] = sentences[i].trim();
        if (sentences[i].length > 0) {
            sentences[i] = capitalizeFirstLetter(sentences[i].toLowerCase());
        }
    }

    // Join the sentences back together
    let processedText = sentences.join('').replace(/\s([?.!])/g, '$1 '); // Ensure proper spacing

    // Additional grammar fixes can be added here
    // TODO: remove parentheticals, quotes
    // Capitalize 'I' and specific proper nouns in the middle of sentences
    const properNouns = {
        'i': 'I',
        'stephanie': 'Stephanie',
        'florida': 'Florida',
        'georgia': 'Georgia',
        'riverside': 'Riverside',
        'california': 'California',
        'massachusetts': 'Massachusetts',
        'houston': 'Houston',
        'christmas': 'Christmas',
        'spokane': 'Spokane',
        'washington': 'Washington',
        'eden': 'Eden'
    };

    processedText = processedText.replace(/\b\w+\b/g, function(match) {
        return properNouns[match] || match;
    });

    return processedText;
}

function addLinesToDOM(letter, lines) {
    for(let line = 0; line < lines.length; line++) {
        letter.child(createDiv(`${lines[line]}<br>`));
    }
}

function generateNewLyrics(){
    // window.location.reload();
    letter.remove();
    letter = createDiv();
    letter.id("letter");
    setup();
}
