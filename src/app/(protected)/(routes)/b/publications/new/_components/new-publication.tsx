"use client"


import React, { use, useState, useEffect } from 'react'
import TipTapEditor from '@/components/tip-tap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAction } from '@/hooks/use-action'
import SelectPopoverModality from '@/components/select-popover-modality'
// import { createPublication } from '@/actions/business/create-publication'
import { Checkbox } from '@/components/ui/checkbox'
import ConfirmDialog from '@/components/confirm-dialog'
import FormError from '@/components/form-utilities/form-error'
import Loader from '@/components/loader'
import { ShortSkill } from '@/types/business'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown } from "lucide-react"
import { X } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import TimeRangeInput from '@/components/time-range'
import ImageUploader from './image-uploader'


interface NewPublicationProps {
  skills: ShortSkill[]
}

const modalities = ['Presencial', 'Remoto', 'Híbrido']

function NewPublication({
  skills
}: NewPublicationProps
) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [modality, setModality] = useState('')
  const [entryTime, setEntryTime] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [benefits, setBenefits] = useState('')
  const [requirements, setRequirements] = useState('')
  const [isRemunerated, setIsRemunerated] = useState(false)
  const [remuneration, setRemuneration] = useState('')
  const [error, setError] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<ShortSkill[]>([])
  const [newSkillsSelected, setNewSkillsSelected] = useState<ShortSkill[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [openSkillPopover, setOpenSkillPopover] = useState(false)

  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };


  const handleOnSelectSkill = (skill: ShortSkill) => {
    const skills = [...selectedSkills]
    const index = skills.findIndex((s) => s.skillId === skill.skillId)
    if (index === -1) {
      skills.push(skill)
    } else {
      skills.splice(index, 1)
    }
    setSelectedSkills(skills)
  }


  const handleOnRemoveSkill = (skill: ShortSkill) => {
    const skills = selectedSkills.filter((s) => s.skillId !== skill.skillId)
    setSelectedSkills(skills)
    if (newSkillsSelected.some((s) => s.skillId === skill.skillId)) {
      setNewSkillsSelected(newSkillsSelected.filter((s) => s.skillId !== skill.skillId))
    }
  }

  const handleAddNewSkill = (skillName: string) => {
    const id = Math.random().toString(36).substring(7)
    const newSkill = { publicationSkillId: 'new', skillId: id, name: skillName }
    if (newSkillsSelected.some((s) => s.name === newSkill.name)) {
      setSearchTerm('')
      return
    }
    setNewSkillsSelected([...newSkillsSelected, newSkill])
    handleOnSelectSkill(newSkill)
    setSearchTerm('')
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section className=' md:px-6 flex flex-col gap-4 mt-4'>
      <div>
        <Label className='font-semibold '>Titulo</Label>
        <Input
          id='title'
          name='title'
          placeholder='Titulo de la publicación'
          className='w-full mt-2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Descripción</Label>
        <TipTapEditor content={description} setContent={setDescription} />
      </div>
      <div className='flex flex-col gap-4 md:gap-4 md:flex-row justify-between'>
        <div className='flex flex-col gap-2'>
          <Label className='font-semibold'>Seleciona la modalidad de trabajo</Label>
          <SelectPopoverModality
            key={modality}
            options={modalities}
            withSearch={false}
            value={modality}
            setValue={setModality}
            label='Selecciona la modalidad'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='font-semibold'>Selecciona el horario de trabajo</Label>
          <TimeRangeInput />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row gap-1'>
            <Checkbox
              checked={isRemunerated}
              onCheckedChange={!isRemunerated ? () => setIsRemunerated(true) : () => setIsRemunerated(false)}
            />
            <Label className='font-semibold'>Remunerado</Label>
          </div>
          <Input
            id='remuneration'
            name='remuneration'
            type='number'
            placeholder='$ Valor'
            className='w-full'
            value={remuneration}
            onChange={(e) => setRemuneration(e.target.value)}
            disabled={!isRemunerated}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Añade los beneficios que le ofreces al estudiantes</Label>
        <TipTapEditor content={benefits} setContent={setBenefits} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Añade los requisitos del puesto</Label>
        <TipTapEditor content={requirements} setContent={setRequirements} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Habilidades requeridas *</Label>
        <p className='text-muted-foreground text-sm'>Te recomendamos seleccionar al menos 3 habilidades</p>
        <div className="mt-2">
          <Popover open={openSkillPopover} onOpenChange={setOpenSkillPopover}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full flex justify-between">
                Seleccionar habilidad
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <Input
                  placeholder="Buscar habilidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredSkills.length === 0 ? (
                  <CommandEmpty>
                    Habilidad no encontrada
                    <Button
                      className="mt-2"
                      onClick={() => handleAddNewSkill(searchTerm)}>
                      Agregar "{searchTerm}"
                    </Button>
                  </CommandEmpty>
                ) : (
                  <CommandList>
                    <CommandGroup>
                      {filteredSkills.map((skill) => (
                        <CommandItem
                          key={skill.skillId}
                          value={skill.name}
                          onSelect={() => handleOnSelectSkill(skill)}
                        >
                          <span>{skill.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <div className='my-2'>
            {selectedSkills.map((skill) => (
              <Badge key={skill.skillId} className="mr-1 hover:bg-primary">
                {skill.name}
                <Button
                  className="h-4 w-4 text-white p-0 ml-1"
                  onClick={() => handleOnRemoveSkill(skill)}
                >
                  <X aria-label="Eliminar habilidad" className="text-white h-4 w-4" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {!!error && <FormError error={error} />}
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Imagen</Label>
        <ImageUploader onImageChange={handleImageChange} />
      </div>
      <div className='flex justify-end'>
        <ConfirmDialog
          asChild
          alertTitle='Publicar publicación'
          alertDescription='¿Estás seguro de publicar la publicación?'
          onConfirm={() => console.log('confirm')}
        >
          <Button className='btn btn-primary w-full md:w-auto'
            disabled={[title, description, modality, entryTime, departureTime, benefits, requirements, selectedSkills].includes('')}
          >
            Publicar
          </Button>
        </ConfirmDialog>
      </div>
    </section >
  )
}

export default NewPublication