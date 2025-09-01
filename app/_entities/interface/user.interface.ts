import { RoleType } from "../enum/role.enum";

export interface User {
    id : string;
    first_name : string;
    last_name : string;
    role : RoleType;
    email : string;
    added_by : string;
    date_added : string;
}

export interface UsersPage {
    result : User[];
    nextPage ?: number;
    total : number;
}