import { motion } from 'framer-motion'
import SkillCard from './SkillCard'
import { SkillsListProps } from '../interfaces/ISkills'

export default function SkillsList({ skills, filter, variants }: SkillsListProps) {
    const filtered = skills.filter(s => s.type === filter)

    return (
        <motion.div
            variants={variants.container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        >
            {filtered.length > 0 ? (
                filtered.map((s, i) =>
                    <SkillCard
                        key={i}
                        skill={s}
                        variants={variants.item}
                    />
                )
            ) : (
                <p className="text-white text-xl font-medium col-span-full text-center py-12">
                    Nenhuma {filter} cadastrada.
                </p>
            )}
        </motion.div>
    )
}