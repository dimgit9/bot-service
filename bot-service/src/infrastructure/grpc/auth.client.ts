import { loadSync } from "@grpc/proto-loader"
import { credentials, loadPackageDefinition } from "@grpc/grpc-js"

import { PROTO_PATHS } from "@dimgit9/contracts"
import { type AuthServiceClient } from "@dimgit9/contracts/gen/ts/auth"

import { CONFIG } from "@/config"

const packageDef = loadSync(PROTO_PATHS.AUTH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const proto = loadPackageDefinition(packageDef) as any

export const authClient: AuthServiceClient = new proto.auth.v1.AuthService(
  CONFIG.AUTH_GRPC_URL,
  credentials.createInsecure(),
)
