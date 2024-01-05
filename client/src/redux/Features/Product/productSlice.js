import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

const initialState = {
  productdata: {},
  fetchProductData: [],
  SingleProductData: {},
  AllProductData: [],
  deleteProductData: {},
  updateProductData: {},
  productStatusData: {},
  trackStatusData: {},
  TrackProductData: {},
  IntrackingProductdata: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalItems: 0,
  isLoading: false,
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (addproductData, thunkAPI) => {
    try {
      const response = await productApi.addProduct(addproductData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Productsbyemployee = createAsyncThunk(
  "product/Productsbyemployee",
  async (productDataId, { getState, rejectWithValue }) => {
    try {
      const { currentPage, pageSize } = getState().product;
      const response = await productApi.fetchProductsbyemployee(
        productDataId,
        currentPage,
        pageSize
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SingleProduct = createAsyncThunk(
  "/product/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.getSingleProduct(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AllProduct = createAsyncThunk(
  "/product/fetchallProduct",
  async (_, thunkAPI) => {
    try {
      const response = await productApi.getAllProduct();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductbyId = createAsyncThunk(
  "product/deleteproductbyid",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.deleteProduct(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (id, thunkAPI) => {
    try {
      const response = await productApi.updateProduct(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ProductStatus = createAsyncThunk(
  "product/productstatus",
  async ({ id, newStatus }, thunkAPI) => {
    try {
      const response = await productApi.changeProductStatus(id, newStatus);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const TrackingProduct = createAsyncThunk(
  "/product/trackProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productApi.getTrackProduct(data);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const TrackStatus = createAsyncThunk(
  "product/changeTrackStatus",
  async ({ id, newStatus }, thunkAPI) => {
    try {
      const response = await productApi.changeTrackStatus(id, newStatus);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getIntrackingProduct = createAsyncThunk(
  "product/intrackingProduct",
  async (productDataId, { rejectWithValue }) => {
    try {
      const response = await productApi.getIntrackingProduct(
        productDataId,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.productdata = {};
    },
    resetDeleteState: (state) => {
      state.deleteProductData = {};
    },
    resetProductStatusState: (state) => {
      state.productStatusData = {};
    },
    resetTrackStatusState: (state) => {
      state.trackStatusData = {};
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productdata = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productdata = action.payload;
      })
      .addCase(Productsbyemployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Productsbyemployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchProductData = action.payload;
        state.currentPage = action.payload?.pageInfo?.currentPage;
        state.totalPages = action.payload?.pageInfo?.totalPages;
        state.totalItems = action.payload?.pageInfo?.totalItems;
      })
      .addCase(Productsbyemployee.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchProductData = action.payload;
      })
      .addCase(SingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SingleProductData = action.payload;
      })
      .addCase(SingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.SingleProductData = action.payload;
      })
      .addCase(AllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllProductData = action.payload;
      })
      .addCase(AllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.AllProductData = action.payload;
      })
      .addCase(deleteProductbyId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductbyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteProductData = action.payload;
      })
      .addCase(deleteProductbyId.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteProductData = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateProductData = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.updateProductData = action.payload;
      })
      .addCase(ProductStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProductStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productStatusData = action.payload;
      })
      .addCase(ProductStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.productStatusData = action.payload;
      })
      .addCase(TrackingProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TrackingProduct.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.TrackProductData = action.payload;
      })
      .addCase(TrackingProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.TrackProductData = action.payload;
      })
      .addCase(TrackStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TrackStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trackStatusData = action.payload;
      })
      .addCase(TrackStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.trackStatusData = action.payload;
      })
      .addCase(getIntrackingProduct.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getIntrackingProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.IntrackingProductdata = action.payload;
    })
    .addCase(getIntrackingProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.IntrackingProductdata = action.error;
    })

  },
});

export const {
  resetProductState,
  resetDeleteState,
  resetProductStatusState,
  setCurrentPage,
  setPageSize,
  resetTrackStatusState,
} = productSlice.actions;
export default productSlice.reducer;
