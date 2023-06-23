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
    const commentRepository = connection.getRepository(Comment);
    const pointOfInterestRepository = connection.getRepository(PointOfInterest);
    const categoryRepository = connection.getRepository(Category);
    const cityRepository = connection.getRepository(City);

    // Vérifiez si la table User est vide
    const existingUsers = await userRepository.find();
    const existingComments = await commentRepository.find();
    const existingPointOfInterests = await pointOfInterestRepository.find();
    const existingCategories = await categoryRepository.find();
    const existingCities = await cityRepository.find();

    if (existingUsers.length === 0) {
        const usersToInsert = [
            { email: "johndoe@example.com", username: "johndoe", password: "Password123", role: 1 },
            { email: "janesmith@example.com", username: "janesmith", password: "Password456", role: 2 },
        ];

        const createdUsers = await userRepository.save(usersToInsert);

        console.log("🌱Database seeded with users");

        if (existingCategories.length === 0) {
            const categoriesToInsert = [
                { name: "Category 1", userId: createdUsers[0].id },
                { name: "Category 2", userId: createdUsers[1].id },
                // Ajoutez d'autres catégories de seed ici...
            ];

            const createdCategories = await categoryRepository.save(categoriesToInsert);

            console.log("🌱Database seeded with categories");

            if (existingPointOfInterests.length === 0) {
                const pointOfInterestsToInsert = [
                    {
                        name: "PointOfInterest 1",
                        description: "Description 1",
                        latitude: "123.456",
                        longitude: "789.012",
                        categories: [createdCategories[0]],
                    },
                    {
                        name: "PointOfInterest 2",
                        description: "Description 2",
                        latitude: "345.678",
                        longitude: "901.234",
                        categories: [createdCategories[1]],
                    },
                ];

                const createdPointOfInterests = await pointOfInterestRepository.save(pointOfInterestsToInsert);

                console.log("🌱Database seeded with pois");

                if (existingComments.length === 0) {
                    const commentsToInsert = [
                        {
                            comment: "Great place!",
                            note: 5,
                            userId: createdUsers[0].id,
                            pointOfInterestId: createdPointOfInterests[0].id,
                        },
                        {
                            comment: "Nice view!",
                            note: 4,
                            userId: createdUsers[1].id,
                            pointOfInterestId: createdPointOfInterests[0].id,
                        },
                    ];

                    await commentRepository.save(commentsToInsert);

                    console.log("🌱Database seeded with comments");
                }
            }
        }
    }

    if (existingCities.length === 0) {
        const citiesToInsert = [
            {
                name: "City 1",
                latitude: "123.456",
                longitude: "789.012",
            },
            {
                name: "City 2",
                latitude: "345.678",
                longitude: "901.234",
            },
        ];

        await cityRepository.save(citiesToInsert);

        console.log("🌱Database seeded with cities");
    }

    // if (existingUsers.length === 0) {
    //     // Insérez des données de seed ici
    //     const usersToInsert = [
    //         { email: "johndoe@example.com", username: "johndoe", password: "Password123", role: 1 },
    //         { email: "janesmith@example.com", username: "janesmith", password: "Password456", role: 2 },
    //     ];
    //     await userRepository.save(usersToInsert);
    //     console.log("🌱Database seeded with users");
    // };

    // if (existingCategories.length === 0) {
    //     // Insérez des données de seed ici
    //     const categoriesToInsert = [
    //         { name: "Category 1", userId: 1 },
    //         { name: "Category 2", userId: 2 },
    //         // Ajoutez d'autres categories de seed ici...
    //     ];

    //     await categoryRepository.save(categoriesToInsert);
    //     console.log("🌱Database seeded with categories");
    // }

    // if (existingPointOfInterests.length === 0) {
    //     // Insérez des données de seed ici
    //     const pointOfInterestsToInsert = [
    //         {
    //             name: "PointOfInterest 1",
    //             description: "Description 1",
    //             latitude: "123.456",
    //             longitude: "789.012",
    //         },
    //         {
    //             name: "PointOfInterest 2",
    //             description: "Description 2",
    //             latitude: "345.678",
    //             longitude: "901.234",
    //         },
    //     ];


    //     await pointOfInterestRepository.save(pointOfInterestsToInsert);
    //     console.log("🌱Database seeded with pois");
    // };

    // if (existingComments.length === 0) {
    //     const commentsToInsert = [
    //         { comment: "Great place!", note: 5, userId: 1, pointOfInterestId: 1 },
    //         { comment: "Nice view!", note: 4, userId: 2, pointOfInterestId: 1 },
    //     ];

    //     await commentRepository.save(commentsToInsert);
    //     console.log("🌱Database seeded with comments");
    // }

    // if (existingCities.length === 0) {
    //     const citiesToInsert = [
    //         {
    //             name: "City 1",
    //             latitude: "123.456",
    //             longitude: "789.012",
    //         },
    //         {
    //             name: "City 2",
    //             latitude: "345.678",
    //             longitude: "901.234",
    //         },
    //     ];

    //     await cityRepository.save(citiesToInsert);
    //     console.log("🌱Database seeded with cities");
    // }

    await connection.close();
}