import { ReactElement } from "react"

export interface LoadedSkill {
    name: string
    stars: number
    icon: ReactElement
    type: "skill" | "competence"
}

export interface SkillsListProps {
    skills: LoadedSkill[]
    filter: "skill" | "competence"
    variants: { container: any; item: any }
}

export interface SkillCardProps {
    skill: {
        name: string
        stars: number
        icon: ReactElement
        type: 'skill' | 'competence'
    }
    variants: { item: any }
}