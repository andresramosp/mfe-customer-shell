import * as authConfig from "../authConfig"
import { msalPlugin } from '../plugins/msalPlugin'
import { CustomNavigationClient } from '../router/NavigationClient'
import { registerGuard } from '../router/Guard'

export default {
    authConfig,
    msalPlugin,
    CustomNavigationClient,
    registerGuard
}
