"use client"

import React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, X } from "lucide-react"
import type { Table } from "@tanstack/react-table"

type SearchInputProps<TData> = {
  table: Table<TData>
  placeholder?: string
}

export function SearchInput<TData>({ table, placeholder = "Rechercher..." }: SearchInputProps<TData>) {
  const [searchTerm, setSearchTerm] = React.useState(
    (table.getState().globalFilter as string) ?? ""
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    table.setGlobalFilter(event.target.value)
  }

  return (
    <InputGroup className="w-full md:max-w-sm">
      <InputGroupInput
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Effacer"
          title="Effacer"
          size="icon-xs"
          onClick={() => {
            setSearchTerm("")
            table.setGlobalFilter("")
          }}
          hidden={!searchTerm}
        >
          <X />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
