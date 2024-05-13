import Constants from "expo-constants";

const useEnvironmentVar = (name: string) => {
    let envVar = ""

    const config = Constants.expoConfig
    if (config && config.extra && config.extra[name]) {
        envVar = config.extra[name]
    } else {
        console.error(`Environment var "${name} was not found`)
    }

    return envVar
}

export default useEnvironmentVar