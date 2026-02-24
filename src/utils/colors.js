export function experienceClassName(experienceLevel) {
    switch(experienceLevel) {
        case "Senior":
            return "card-senior";
        case "Mid-level":
            return "card-mid";
        case "Junior":
            return "card-junior";
        default:
            return "";
    }
}