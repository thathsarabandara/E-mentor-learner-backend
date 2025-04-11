import { groupSeeder } from "./seeders/group.seeder";

export const seedAll = async():Promise<any> =>{
    try {
        console.log('Starting seeding all files');
        await groupSeeder();
        console.log('Seeding Finished!')
    } catch (error) {
        console.error('Seeding Failed', error);
        process.exit(1);
    }
}
seedAll();