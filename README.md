<br/>

<p align="center">
  <a href="https://rabbithole.gg/#">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/rabbitholegg/questdk/assets/2935356/8bca331c-4c88-4084-98ce-35c547cfcc4d">
        <img alt="questdk logo" src="https://github.com/rabbitholegg/questdk/assets/2935356/48ca4d95-3e4a-40ae-b3a7-a02f42a14ad4" width="auto" height="80">
      </picture>
  </a>
</p>

<p align="center">
  <code> 0.0.0-alpha </code>
</p>

<br/>

<p align="center">
      <picture>
        <img src="https://github.com/rabbitholegg/questdk/assets/2935356/c7e21457-7a7a-4ec8-af26-7f8a6bb8726e" width="60%">
      </picture>
<br />
<br />
<code>Go instead where there is no path and leave a trail.</code>
</p>
<br/>


## Set up the codebase

### Set up pnpm

Install `pnpm` globally:

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

## Developing

### Build the codebase

```bash
pnpm build
```

### Run the tests

```bash
pnpm test
```

## Publishing
In order to publish you need to make sure that the pull request you're submitting has a changeset. If you don't want to publish this isn't needed.
In order to generate a changeset run `pnpm changeset`, select a change type [major,minor,patch], and draft a small summary of the changeset.

After this all you need to do is push and merge the pull request and the Github Action will handle the process of versioning, and publishing.