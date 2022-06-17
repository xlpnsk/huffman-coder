const text = 'Katarzyna Kurek'

function getCharFrequency(str){
    const freq = {}
    for(let i=0; i<str.length; i++){
        const char = str[i]
        !freq[char] ? freq[char] = 1 : freq[char]++
    }
    return freq
}

let chars = getCharFrequency(text)

function buildTree(chars){
    const tree = []
    for(let char in chars) {
        const node = {
            'val': chars[char], 
            'char': char,
            'left': null,
            'right': null
        } 
        tree.push(node);
    }
    while(tree.length !== 1){
        let min1 = tree.reduce(function(prev, curr) {
            return prev.val < curr.val ? prev : curr
        })
        tree.splice(tree.indexOf(min1), 1);
        let min2 = tree.reduce(function(prev, curr) {
            return prev.val < curr.val ? prev : curr
        })
        tree.splice(tree.indexOf(min2), 1)

        let node = {
            'val': min1.val + min2.val, 
            'char': '',
            'left': null,
            'right': null
        } 
        node.left = min1
        node.right = min2

        tree.push(node)
    }
    return tree[0]
}

const tree = buildTree(chars)
console.log(tree)

function getCharCode(tree){  
    let code = {}; 
    let getCode = (node, currCode) => {  
        if (!node.length && !node.right) return
        if (node.left && !node.left.left && !node.left.right){  
            code[node.left.char] = currCode + '0'  
        }  
        if (node.right && !node.right.left && !node.right.right){  
            code[node.right.char] = currCode + '1'
        }  
        if(node.left){  
            getCode(node.left, currCode + '0') 
        }  
        if(node.right){  
            getCode(node.right, currCode + '1') 
        }  
    }
    getCode(tree, '') 
    return code
}  

const charCodes = getCharCode(tree)
console.log(charCodes)

function getCodeStr(charCodes, str){  
    let result = ''
    for(let i = 0; i < str.length; i++){  
        result += charCodes[str[i]]
    }  
    return result
}  

const codeStr = getCodeStr(charCodes, text)
console.log(codeStr)

function getProb(chars, text){
    let prob = {}
    Object.entries(chars).forEach(entry => {
        const [key, val] = entry;
        p = val/text.length
        prob[key] = p
    });
    return prob
}

const prob = getProb(chars, text)
console.log(prob)

function getEntropy(prob){
    let entropy = 0
    Object.values(prob).forEach(val => {
        entropy += val * Math.log2(1/val);
    })
    return entropy
}

const entropy = getEntropy(prob)
console.log(entropy)

function getAvgLength(prob, charCodes){
    let length = 0
    Object.entries(prob).forEach(entry => {
        const [key, val] = entry;
        length += val * charCodes[key].length
    });
    return length
}

const avgLength = getAvgLength(prob, charCodes)
console.log(avgLength)