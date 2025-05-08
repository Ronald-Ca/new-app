import CustomAlert from "../components/common/alert";
import { createContext, useContext, useState, ReactNode } from "react"

type AlertType = "success" | "error"

interface AlertContextType {
    setAlert: (alert: { title: string; message: string; type: AlertType } | null) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider")
    }
    return context
}

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<{ title: string; message: string; type: AlertType } | null>(null)

    return (
        <AlertContext.Provider value={{ setAlert }}>
            {alert && <CustomAlert {...alert} key={Date.now()} />}
            {children}
        </AlertContext.Provider>
    )
}