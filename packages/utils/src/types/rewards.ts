import { z } from "zod";

const RewardTypeSchema = z.union([
        z.literal('ERC20'),
        z.literal('erc20'),
        z.literal('erc1155'),
    ]);
export { RewardTypeSchema };
