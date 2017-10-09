// Parsing the Rules
function parseRules() {
    const rulesObj = {};
    let input = document.getElementById('inputObjectText').value;
    let rules = document.getElementById('rules').children;
    // Itereate over the form elements
    for (rule of rules) {
        // Extract input field values from the DOM
        let id = rule.querySelector('input[name="id"]').value;
        let title = rule.querySelector('input[name="title"]').value;
        let body = rule.querySelector('input[name="body"]').value;
        let true_id = rule.querySelector('input[name="true_id"]').value;
        let false_id = rule.querySelector('input[name="false_id"]').value;
    
        // Evaluating the functions stored in body since they were fetched strings
        let func = eval(`(${body})`);

        // Then we put everything into an object, and store that object with all the other rules
        rulesObj[id] = {
            title, body, true_id, false_id, func
        };
    }
    return rulesObj;
}

// Parsing the inputObject
function parseInputObject() {
    return JSON.parse(document.querySelector('input[name="inputObject"]').value);
}

function evalRules(inputObject, rules, ruleId) {
    // Looking up the rule we need to check
    const rule = rules[ruleId];

    // Calling the rule function, with the inputObject
    const ruleRes = rule.func(inputObject);
    
    let nextRule = null;
    if (ruleRes === true) {
        console.log(`%c Rule ${ruleId} is true. Passed`, `color: #9FCC3A; font-size: 15px`);
        nextRule = rule.true_id;
    } else {
        console.log(`%c Rule ${ruleId} is false. Failed`, `color: #FC0D26; font-size: 15px`);
        nextRule = rule.false_id;
    }

    if (nextRule) {
        // If there is a next rule, call this function recursively
        return evalRules(inputObject, rules, nextRule);
    } else {
        // Stop if there is no next rule
        console.log('%c End of the flow ', 'background: #000; color: #FFF; font-size: 15px');
        return;
    }
}

function go() {
    let rules = parseRules();
    let inputObject = parseInputObject();
    document.getElementById('hint').style.display = 'block';
    console.log('%c Flow started ', 'background: #F86543; color: #FFF; font-size: 15px');
    evalRules(inputObject, rules, 1);
}
