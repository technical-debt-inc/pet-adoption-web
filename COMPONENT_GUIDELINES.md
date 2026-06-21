# PetAdopt — Guidelines de Componentes

Regras para manter consistência ao criar ou editar qualquer componente em `src/components/ui/`.

---

## 1. Vocabulário de variantes — sempre o padrão shadcn

Todo componente com variantes visuais usa **exatamente** estes nomes. Nunca crie sinônimos (`primary`, `success`, `danger` etc.) em componentes novos.

| Variant | Quando usar |
|---|---|
| `default` | Ação primária, estado positivo/neutro padrão |
| `secondary` | Ação ou estado secundário, menos destaque |
| `destructive` | Ação ou estado de erro, perigo, exclusão |
| `outline` | Borda visível, fundo transparente — ações neutras/cancelar |
| `ghost` | Sem borda nem fundo — ações de baixa ênfase |
| `link` | Aparência de link de texto |

```tsx
// ✅ Certo
variant: { default: "...", destructive: "...", outline: "..." }

// ❌ Errado — nunca criar vocabulário próprio
variant: { primary: "...", danger: "...", warning: "..." }
```

### Tamanhos (`size`)

| Size | Quando usar |
|---|---|
| `sm` | Compacto — barras de ferramentas, tabelas |
| `default` | Tamanho padrão de uso geral |
| `lg` | Destaque — CTAs principais, heroes |
| `icon` | Botão quadrado só com ícone |

---

## 2. Estado de domínio ≠ variante de estilo

Algumas props representam um **conceito do negócio**, não uma escolha visual. Essas **não** seguem o vocabulário shadcn — usam o nome real do domínio.

| Componente | Prop | Valores | Por quê |
|---|---|---|---|
| `PetStatusBadge` | `status` | `available \| adopted` | É o estado real do pet, não um estilo |
| `Chip` | `active` | `true \| false` | É seleção/toggle, não hierarquia visual |

Regra para saber qual usar: **se a prop descreve algo que existe independente da UI (um pet adotado continua adotado mesmo sem cor), é estado de domínio. Se só existe para diferenciar visualmente (botão mais ou menos importante), é variante shadcn.**

---

## 3. Toda variante passa por `cva`

Nunca usar `if/else` ou template string condicional para aplicar classes de variante.

```tsx
// ❌ Evitar
className={status === "available" ? "bg-green-100" : "bg-purple-100"}

// ✅ Usar
const variants = cva("base", {
  variants: { status: { available: "bg-green-100", adopted: "bg-purple-100" } }
})
```

---

## 4. Todo componente tem `data-slot`

Permite estilização/seleção externa sem depender de `className` em cascata.

```tsx
<Comp data-slot="button" data-variant={variant} data-size={size} ... />
```

Convenção de nomenclatura do atributo:
- `data-slot="nome-do-componente"` sempre presente
- `data-variant`, `data-size` quando aplicável (espelha as props de variante shadcn)
- `data-status`, `data-active` para estados de domínio (item 2)

---

## 5. Tokens semânticos, nunca cor bruta

Sempre usar as variáveis do `globals.css` (`text-green-700`, `bg-surface`, `border-[var(--line)]`). Nunca hardcodar hex (`text-[#1BA075]`) dentro de um componente.

Se a marca mudar de cor, só o `globals.css` precisa ser editado — nenhum componente.

---

## 6. Composição entre componentes

Quando um componente usa outro internamente (ex: `Modal` usa `Button`), ele **traduz** seu próprio vocabulário para o vocabulário do componente filho:

```tsx
// Modal usa variant="destructive" → repassa direto pro Button (mesmo vocabulário, sem tradução)
<Button variant={variant === "destructive" ? "destructive" : "default"}>
```

Como agora todos os componentes compartilham o mesmo vocabulário shadcn, essa tradução tende a ser direta — é só repassar a prop.

---

## 7. Toast → use o `sonner`, não recrie

O projeto usa `sonner` (`npx shadcn@latest add sonner`) para toasts. Não criar um sistema de toast customizado.

```tsx
import { toast } from "sonner";

toast.success("Pedido enviado!", { description: "A ONG vai te chamar." });
toast.error("Algo deu errado");      // equivalente a "destructive"
toast.warning("Atenção");
toast.info("Mimi salva nos favoritos");
```

> Nota: a API do `sonner` usa `error` em vez de `destructive` — isso é fixo da lib e não precisa ser "traduzido", é só uma particularidade a lembrar.

---

## 8. Checklist antes de criar um componente novo

- [ ] Variantes de estilo usam `default/secondary/destructive/outline/ghost/link`?
- [ ] Estado de domínio (se houver) tem nome próprio, não forçado no vocabulário shadcn?
- [ ] Toda variante está dentro de um `cva`?
- [ ] Tem `data-slot` no elemento raiz?
- [ ] Usa apenas tokens semânticos do `globals.css`?
- [ ] Se compõe outro componente, repassa a variante sem criar vocabulário extra?
- [ ] `defaultVariants` aponta para o caso mais comum de uso?

---

## Referência rápida — props por componente

| Componente | Props de variante | Vocabulário |
|---|---|---|
| `Button` | `variant`, `size` | shadcn padrão |
| `Modal` | `variant` | shadcn padrão (`default/secondary/outline/destructive`) |
| `Chip` | `active` | domínio (toggle) |
| `PetStatusBadge` | `status`, `onPhoto` | domínio (`available/adopted`) |
| `PetCard` | — (sem variantes, usa `pet.status` internamente) | domínio |
| toast (`sonner`) | método (`.success/.error/.warning/.info`) | shadcn padrão (API da lib) |
