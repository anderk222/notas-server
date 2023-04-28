import { sign, verify } from "jsonwebtoken";
import { APP } from "../core";
import { hash, compare } from 'bcrypt'

const salt_round = 10;

export function genre_jwt(id : number){

    return sign({ id }, APP.SECRET);
    
};

export function validate_token(token : string){

    
    const normalize = token.substring(6).trim();    

    const decode = verify(normalize, APP.SECRET);

    return decode as { id : number };

};

export function encrypt(text : string){

    return hash(text, salt_round); 

}

export function compare_encrypt( text_plain : string,encrypt_text : string,){

    return compare(text_plain, encrypt_text);

}