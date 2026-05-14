export const createListingDTO = (formData) =>({
    title: formData.title,
    description: formData.description,
    price: formData.price,
    currency: formData.currency,
    image_url: formData.image_url,
    urls: formData.urls,
    marketplaces: formData.marketplaces,
    characters: formData.characters.map((character) => Listing_CharacterDTO(character))
})

export const Listing_CharacterDTO = (formData) => ({
    condition: formData.condition,
    id_collection: formData.id_collection
})