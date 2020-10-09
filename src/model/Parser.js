const examplePetition = 
"My name is Anthony Tran. In consideration of recent events and our country's tragic history, it cannot be denied any longer. There is a blatant and unacceptable racism problem in the US. I demand swift and effective justice for Breonna Taylor. Thank you, and please consider this call to action."

class Parser {
    constructor() {
        this.sentences = examplePetition.match(new RegExp(/\b((?!=|\?|\!|\.).)+(.)\b/, 'gm'));
    }
}
export default Parser;