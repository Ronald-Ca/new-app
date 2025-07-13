import { ProjectType } from "@app/services/project-service"
import { SkillType } from "@app/services/skill-service"
import { X, ExternalLink, Code2 } from "lucide-react"
import { Button } from "@app/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@app/components/ui/badge"
import { Separator } from "@radix-ui/react-select"

interface ProjectModalProps {
    project: ProjectType
    skills: SkillType[]
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, skills, isOpen, onClose }: ProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog.Root open onOpenChange={onClose}>
                    <Dialog.Portal >
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="
                                    fixed inset-0 
                                    max-w-3xl max-h-[85vh] 
                                    m-auto mt-28 
                                    bg-gradient-to-b from-slate-900 to-slate-800 
                                    border border-default
                                    rounded-xl
                                    overflow-y-auto
                                    scrollbar-thin
                                    scrollbar-track-transparent scrollbar-track-rounded-lg
                                    scrollbar-thumb-default scrollbar-thumb-rounded-lg
                                    hover:scrollbar-thumb-default
                                "
                            >
                                <Dialog.Close asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={onClose}
                                        className="absolute top-4 right-4 z-50 bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </Dialog.Close>

                                <div className="aspect-video w-full overflow-hidden bg-black">
                                    {project.video ? (
                                        <video
                                            className="w-full h-full object-contain"
                                            src={project.video as string}
                                            poster={project.image as string}
                                            controls
                                            autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={(project.image as string) || "/placeholder.svg"}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="p-6 space-y-6">
                                    
                                    <h2 className="text-2xl font-bold text-white text-center">{project.name}</h2>

                                    <Separator className="bg-white h-[2px] rounded-sm" />

                                    <div>
                                        <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                                            <Code2 className="h-5 w-5 mr-2 text-cyan-400" />
                                            Tecnologias
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((stack) => (
                                                <Badge
                                                    key={stack.id}
                                                    className="bg-gradient-to-r from-default to-blue-600 text-white border-none"
                                                >
                                                    {stack.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {project.description && (
                                        <div>
                                            <h3 className="text-lg font-medium text-white mb-2">Descrição</h3>
                                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-slate-300">
                                                {project.description}
                                            </div>
                                        </div>
                                    )}

                                    {project.link && (
                                        <div>
                                            <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                                                <ExternalLink className="h-5 w-5 mr-2 text-default" />
                                                Link do Projeto
                                            </h3>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-default hover:text-cyan-300 hover:bg-slate-800 transition-colors w-full overflow-hidden text-ellipsis"
                                            >
                                                {project.link}
                                                <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </AnimatePresence>
    )
}
