
class FuctionHelpers {
    public isEmail(email: string): boolean{
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(!(emailRegex.test(email))){
            return false
        }
        return true
    }
}

export const fuctionHelpers = new FuctionHelpers();
