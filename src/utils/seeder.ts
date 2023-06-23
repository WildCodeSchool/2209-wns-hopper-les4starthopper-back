import { createConnection } from "typeorm";
import { User } from "../Entities/User";
import { Comment } from "../Entities/Comment";
import { PointOfInterest } from "../Entities/PointOfInterest";
import { Picture } from "../Entities/Picture";
import { City } from "../Entities/City";
import { Category } from "../Entities/Category";
export async function seedDatabase() {
    // Créez une nouvelle connexion en utilisant la configuration
    const connection = await createConnection({
        type: "postgres",
        host: "db",
        username: "postgres",
        password: "supersecret",
        database: "postgres",
        synchronize: true,
        entities: [User, Comment, PointOfInterest, Picture, City, Category],
        logging: ["query", "error"],
    });

    const userRepository = connection.getRepository(User);

    // Vérifiez si la table User est vide
    const existingUsers = await userRepository.find();
    if (existingUsers.length === 0) {
        // Insérez des données de seed ici
        const usersToInsert = [
            { email: "johndoe@example.com", username: "johndoe", password: "Password123", role: 1 },
            { email: "janesmith@example.com", username: "janesmith", password: "Password456", role: 2 },
        ];

        await userRepository.save(usersToInsert);
        console.log("Database seeded with users");
    }

    // Fermez la connexion après avoir terminé les opérations de seed
    await connection.close();
}