import connectDB from "../../config/Database";
import Group from "../../models/auth/Group.model"
import { groupData } from "../data/groups.data";

export const groupSeeder = async():Promise<any> =>{
    try {
        await connectDB();
        console.log('Group Seeding started');
        await Group.deleteMany();
        const insterted = await Group.insertMany(groupData);
        console.log('Group seeded', insterted);
        console.log('Group Seeding finished');
        process.exit();

    } catch (error) {
        console.error('Seeding Failed', error);
        process.exit(1);
    }
}
