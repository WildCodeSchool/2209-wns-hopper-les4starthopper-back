export const citiesRelation = [
  "createdBy",
  "updatedBy",
  // "user.comments",
  // "user.pictures",
  // "user.categories",
  // "user.pointOfInterests",
  // "user.cities",
  "pointOfInterests",
  // "pointOfInterests.user",
  // "pointOfInterests.comments",
  // "pointOfInterests.pictures",
  // "pointOfInterests.city",
  // "pointOfInterests.categories",
];
export const usersRelations = [
  "createdBy",
  "updatedBy",
  "comments",
  // "comments.user",
  // "comments.pointOfInterest",
  "pictures",
  // "pictures.user",
  // "pictures.pointOfInterest",
  // "pictures.pointOfInterest.city",
  "categories",
  // "categories.user",
  // "categories.pointOfInterests",
  "pointOfInterests",
  // "pointOfInterests.user",
  // "pointOfInterests.comments",
  // "pointOfInterests.pictures",
  // "pointOfInterests.city",
  // "pointOfInterests.categories",
  "cities",
  // "cities.user",
  // "cities.pointOfInterests",
];
export const pointOfInterestRelations = [
  "createdBy",
  "updatedBy",
  // "user.comments",
  // "user.pictures",
  // "user.categories",
  // "user.pointOfInterests",
  // "user.cities",
  "pictures",
  // "pictures.user",
  // "pictures.pointOfInterest",
  "comments",
  // "comments.user",
  // "comments.pointOfInterest",
  "categories",
  // "categories.user",
  // "categories.pointOfInterests",
  "city",
  // "city.user",
  // "city.pointOfInterests",
];
export const commentsRelations = [
  "createdBy",
  "updatedBy",
  // "user.pointOfInterests",
  // "user.cities",
  "pointOfInterest",
  // "pointOfInterest.user",
  // "pointOfInterest.city",
];
export const categoriesRelations = [
  "createdBy",
  "updatedBy",
  //"createdBy.comments",
  // "createdBy.pictures",
  // "createdBy.categories",
  // "createdBy.pointOfInterests",
  // "createdBy.cities",
  "pointOfInterests",
  // "pointOfInterests.user",
  // "pointOfInterests.comments",
  // "pointOfInterests.pictures",
  // "pointOfInterests.city",
  // "pointOfInterests.categories",
];
export const picturesRelation = [
  "createdBy",
  // "user.comments",
  // "user.pictures",
  // "user.categories",
  // "user.pointOfInterests",
  // "user.cities",
  "pointOfInterest",
  // "pointOfInterest.user",
  // "pointOfInterest.comments",
  // "pointOfInterest.pictures",
  // "pointOfInterest.city",
  // "pointOfInterest.categories",
];
