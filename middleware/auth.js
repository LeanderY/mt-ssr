export default function ({ store, redirect }) {
  const user = store.state.home.user
  const length = Object.keys(user).length
  if (length !== 0) {
    return redirect('/')
  }
}
