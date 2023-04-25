import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret  } from "jwks-rsa";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `http://localhost:5004/.well-known/openid-configuration/jwks`
              }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: 'ngcloud-webapi', // aud
            issuer: `https://localhost:5005`, // iss
            algorithms: ['RS256'], // alg
        })
            
    }

    validate(payload: any, done: VerifiedCallback) {
        console.log("PassportStrategy.validate = EXECUTED");
        // TODO: validate scopes and create policy
        
        if (!payload) {
          done(new UnauthorizedException(), false); // 2
        }
    
        return done(null, payload);
    }
}