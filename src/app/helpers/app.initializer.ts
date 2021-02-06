
import { AutenticadorService } from '../service/autenticador.service';


export function appInitializer(authenticationService: AutenticadorService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}