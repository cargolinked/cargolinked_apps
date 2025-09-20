import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@cargolinked/api';

export const trpc = createTRPCReact<AppRouter>();
