import WelcomeHeader from "@/components/main/placement/welcome-header"
import RoleCardList from "@/components/main/placement/role-card-list"

export default function Home() {
  return (
    <main className="min-h-dvh w-full bg-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 md:py-16">
        <WelcomeHeader />
        <RoleCardList />
      </section>
    </main>
  )
}
