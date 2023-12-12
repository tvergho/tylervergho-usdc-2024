/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    
    // Iterate through each book in the scanned text
    scannedTextObj.forEach(book => {
        // Iterate through each content line in the book
        book.Content.forEach(content => {
            // Remove punctuation
            content.Text = content.Text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            // Split into words
            var words = content.Text.split(" ");
            // Check if the text contains the search term
            if (words.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
            }
        });
    });

    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/*
    ADDITIONAL UNIT TESTS
*/
const littlePrinceIn = [
    {
        "Title": "The Little Prince",
        "ISBN": "9789999999999",
        "Content": [
            {
                "Page": 12,
                "Line": 3,
                "Text": "The most beautiful things in the world cannot be seen or touched."
            },
            {
                "Page": 12,
                "Line": 4,
                "Text": "They are felt with the heart."
            },
            {
                "Page": 13,
                "Line": 1,
                "Text": "What is essential is invisible to the eye."
            } 
        ] 
    }
];


// Positive Test: A test that returns a match.
// This also tests that the search correctly strips punctuation, because the word "heart" is followed by a period.
const positiveTestResult = findSearchTermInBooks("heart", littlePrinceIn);
const expectedPositiveTestResult = {
    "SearchTerm": "heart",
    "Results": [
        {
            "ISBN": "9789999999999",
            "Page": 12,
            "Line": 4
        }
    ]
};
if (JSON.stringify(positiveTestResult) === JSON.stringify(expectedPositiveTestResult)) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", expectedPositiveTestResult);
    console.log("Received:", positiveTestResult);
}

// Negative Test: A test that does not return any matches.
const negativeTestResult = findSearchTermInBooks("moon", littlePrinceIn);
const expectedNegativeTestResult = {
    "SearchTerm": "moon",
    "Results": []
}
if (JSON.stringify(negativeTestResult) === JSON.stringify(expectedNegativeTestResult)) {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", expectedNegativeTestResult);
    console.log("Received:", negativeTestResult);
}

// Test for multiple matches in the same book.
const multipleMatchTestResult = findSearchTermInBooks("the", littlePrinceIn);
if (multipleMatchTestResult.Results.length === 3) {
    console.log("PASS: Multiple Matches Test");
} else {
    console.log("FAIL: Multiple Matches Test");
    console.log("Expected: 3");
    console.log("Received:", multipleMatchTestResult.Results.length);
}

// Partial Word Test: test for a word that is part of another word.
const partialWordTestResult = findSearchTermInBooks("The", littlePrinceIn);
if (partialWordTestResult.Results.length === 1) { // Match "The" but not "They"
    console.log("PASS: Partial Word Test");
} else {
    console.log("FAIL: Partial Word Test");
    console.log("Expected: 1");
    console.log("Received:", partialWordTestResult.Results.length);
}

// Case-sensitive Test: A test that matches on “The” but not on “the”.
const caseSensitiveTestResult1 = findSearchTermInBooks("The", littlePrinceIn);
const caseSensitiveTestResult2 = findSearchTermInBooks("the", littlePrinceIn);
if (caseSensitiveTestResult1.Results.length === 1 && caseSensitiveTestResult2.Results.length === 3) {
    console.log("PASS: Case-sensitive Test");
} else {
    console.log("FAIL: Case-sensitive Test");
    console.log("Expected: 1, 3");
    console.log("Received:", caseSensitiveTestResult1.Results.length, caseSensitiveTestResult2.Results.length);
}

// Test for no books in input.
const noBooksTestResult = findSearchTermInBooks("world", []);
if (noBooksTestResult.Results.length === 0) {
    console.log("PASS: No Books Test");
} else {
    console.log("FAIL: No Books Test");
    console.log("Expected: 0");
    console.log("Received:", noBooksTestResult.Results.length);
}

// Test for a book with no content.
const noContentTestResult = findSearchTermInBooks("world", [{"Title": "Empty Book", "ISBN": "0000000000", "Content": []}]);
if (noContentTestResult.Results.length === 0) {
    console.log("PASS: No Content Test");
} else {
    console.log("FAIL: No Content Test");
    console.log("Expected: 0");
    console.log("Received:", noContentTestResult.Results.length);
}

// Test for an empty search query.
const emptyQueryTestResult = findSearchTermInBooks("", littlePrinceIn);
if (emptyQueryTestResult.Results.length === 0) {
    console.log("PASS: Empty Query Test");
} else {
    console.log("FAIL: Empty Query Test");
    console.log("Expected: 0");
    console.log("Received:", emptyQueryTestResult.Results.length);
}