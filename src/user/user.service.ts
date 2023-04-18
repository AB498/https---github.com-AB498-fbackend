import { db } from "../utils/db.server";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const listUsers = async (): Promise<User[]> => {
    const users = await db.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true
        }
    });
    console.log(users);
    return users;
}
export const getUser = async (id: number): Promise<User | null> => {
    const user = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true
        }
    });
    return user;
}

export const createUser = async (user: User): Promise<User> => {
    const newUser = await db.user.create({
        data: user
    });
    return newUser;
}

export const updateUser = async (id: number, user: User): Promise<User | null> => {
    const updatedUser = await db.user.update({
        where: {
            id: id
        },
        data: user
    });
    return updatedUser;
}

export const deleteUser = async (id: number): Promise<User | null> => {
    const deletedUser = await db.user.delete({
        where: {
            id: id
        }
    });
    return deletedUser;
}