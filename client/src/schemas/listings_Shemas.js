import {z} from 'zod';
import { ConditionEnum } from '../utils/Enums';
import { CurrencyEnum } from '../utils/Enums';
import { MarketplaceEnum } from '../utils/Enums';

const CreateListingSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    currency: z.enum(Object.values(CurrencyEnum), 'Invalid currency'),
    image_url: z.string().url('Invalid image URL'),
    urls: z.array(z.string().url('Invalid URL')),
    marketplaces: z.array(z.enum(Object.values(MarketplaceEnum), 'Invalid marketplace')),
    characters: z.array(Listing_CharacterSchema),    
}) 
export { CreateListingSchema };

const Listing_CharacterSchema = z.object({
    condition: z.enum(Object.values(ConditionEnum), 'Invalid condition'),
    id_collection: z.number().positive('Collection ID must be a positive number'),
})
export { Listing_CharacterSchema };