import { Component } from 'react';
import { searchImages } from '../api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    loadMore: false,
    loading: false,
    error: undefined,
    page: 1,
    perPage: 12,
    query: '',
    modalOpen: false,
    modalUrl: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.searchImages();
    } else if (this.state.query !== prevState.query) {
      this.searchImages(true);
    }
  }

  handleQuerySubmit = query => {
    this.setState({
      query,
    });
  };

  handleImageClick = url => {
    this.setState({
      modalOpen: true,
      modalUrl: url,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  async searchImages(clean) {
    this.setState({
      loadMore: false,
      loading: true,
      error: undefined,
    });

    try {
      const images = await searchImages(this.state.query, this.state.page);

      this.setState(prev => {
        let updatedImages = [...prev.images, ...images.hits];

        if (clean) {
          updatedImages = images.hits;
        }

        return {
          images: updatedImages,
          loadMore: this.state.page < Math.ceil(images.total / 12),
        };
      });
    } catch (e) {
      this.setState({
        error: 'Failed to load images',
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleQuerySubmit} />
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.handleImageClick}
        />

        {this.state.loadMore && (
          <Button onLoadMoreClick={this.handleLoadMore} />
        )}

        <Loader visible={this.state.loading} />
        <Modal open={this.state.modalOpen} url={this.state.modalUrl} />
      </div>
    );
  }
}
