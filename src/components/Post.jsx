import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

import { ThumbsDown, ThumbsUp, Trash } from 'phosphor-react'

export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const [likeCount, setLikeCount] = useState(0)
    const [PostLiked, setPostLiked] = useState(false);

    const [DislikeCount, setDislikeCount] = useState(0)
    const [PostDisliked, setPostDisliked] = useState(false);

    function handlePostLike() {
        if (PostLiked) {
          setLikeCount((state) => state - 1);
          setPostLiked(false);
        } else {
          setLikeCount((state) => state + 1);
          setPostLiked(true);
      
          if (PostDisliked) {
            setDislikeCount((state) => state - 1);
            setPostDisliked(false);
          }
        }
      }
      
      function handlePostDislike() {
        if (PostDisliked) {
          setDislikeCount((state) => state - 1);
          setPostDisliked(false);
        } else {
          setDislikeCount((state) => state + 1);
          setPostDisliked(true);
      
          if (PostLiked) {
            setLikeCount((state) => state - 1);
            setPostLiked(false);
          }
        }
      }
      

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function heandleCreateNewComment() {
        event.preventDefault()

        setComments([...comments, newCommentText])

        setNewCommentText('')
    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete
        })

        setComments(commentsWithoutDeleteOne)
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Este campo é obrigatório!')
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type == 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type == 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <footer className={styles.postButtons}>
                <button className={styles.likeBtn} onClick={handlePostLike}>
                    <ThumbsUp className={PostLiked ? styles.likeOn : styles.likeOff} />
                    <span className={PostLiked ? styles.likeOn : styles.likeOff}>{likeCount}</span>
                </button>

                <button className={styles.dislikeBtn} onClick={handlePostDislike}>
                    <ThumbsDown className={PostDisliked ? styles.dislikeOn : styles.dislikeOff} />
                    <span className={PostDisliked ? styles.dislikeOn : styles.dislikeOff}>{DislikeCount}</span>
                </button>
            </footer>


            <form onSubmit={heandleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe seu comentário...'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty} >Publicar</button>
                </footer>
            </form>

            <dir className={styles.CommentList}>
                {comments.map(comment => {
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                })}
            </dir>
        </article>
    )
}