import { SkillType } from "@app/services/skill-service"
import { type ReactElement, useState, useEffect } from "react"
import { loadIcons } from "@app/helpers/load-icons"
import { useGetSkillsQuery } from "@app/queries/skill"

type LoadedSkill = Omit<SkillType, "icon"> & {
  stars: number
  icon: ReactElement
}

export function useLoadedSkills() {
  const { data: rawSkills } = useGetSkillsQuery()
  const [loadedSkills, setLoadedSkills] = useState<LoadedSkill[]>([])

  useEffect(() => {
    if (!rawSkills) return

    ;(async () => {
      const withIcons: LoadedSkill[] = await Promise.all(
        rawSkills.map(async s => {
          const iconElement = await loadIcons(s.icon.trim(), s.color ?? "#00BFFF")

          const { icon: _iconString, ...rest } = s
          return {
            ...rest,
            stars: s.level,
            icon: iconElement,
          }
        })
      )
      setLoadedSkills(withIcons)
    })()
  }, [rawSkills])

  return { loadedSkills, isLoading: !rawSkills }
}
