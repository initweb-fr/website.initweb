import { getPublishDate } from '@finsweet/ts-utils';

/**
 * Greets the user by printing a message in the console.
 * @param name The user's name.
 */
export const verifyLoad = () => {
  const publishDate = getPublishDate();

  console.log(`Script loaded from LocalHost`);
  console.log(
    `This site was last published on ${publishDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })}.`
  );
  console.log(`------------------------------------------`);
};
