<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        Open
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose as-child>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>