export enum Role {
    "ADMIN",
    "USER"
}
export type User = {
    id: string;
    role: Role
}