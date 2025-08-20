import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryCreateReq } from '../../model/request/service/category-create-req.model';
import { CategoryUpdateReq } from '../../model/request/service/category-update-req.model';
import { MainServiceCreateReq } from '../../model/request/service/main-service-create-req.model';
import { MainServiceUpdateReq } from '../../model/request/service/main-service-update-req.model';
import { SubServiceCreateReq } from '../../model/request/service/sub-service-create-req.model';
import { SubServiceUpdateReq } from '../../model/request/service/sub-service-update-req.model';
import { CategoryCreateRes } from '../../model/response/service/category-create-res.model';
import { CategoryUpdateRes } from '../../model/response/service/category-update-res.model';
import { MainServiceCreateRes } from '../../model/response/service/main-service-create-res.model';
import { MainServiceUpdateRes } from '../../model/response/service/main-service-update-res.model';
import { ServiceCategoryGet } from '../../model/response/service/service-category-get.model';
import { SubServiceCreateRes } from '../../model/response/service/sub-service-create-res.model';
import { SubServiceUpdateRes } from '../../model/response/service/sub-service-update-res.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCatalogService {
  private http = inject(HttpClient);

  getAllServiceForAdmin(): Observable<ServiceCategoryGet[]> {
    return this.http.get<ServiceCategoryGet[]>(
      `${environment.apiUrl}/admin/service`
    );
  }

  createCategory(
    categoryData: CategoryCreateReq
  ): Observable<CategoryCreateRes> {
    return this.http.post<CategoryCreateRes>(
      `${environment.apiUrl}/admin/service-category`,
      categoryData
    );
  }

  createMainService(
    mainServiceData: MainServiceCreateReq
  ): Observable<MainServiceCreateRes> {
    return this.http.post<MainServiceCreateRes>(
      `${environment.apiUrl}/admin/main-service`,
      mainServiceData
    );
  }

  createSubService(
    subServiceData: SubServiceCreateReq
  ): Observable<SubServiceCreateRes> {
    return this.http.post<SubServiceCreateRes>(
      `${environment.apiUrl}/admin/sub-service`,
      subServiceData
    );
  }

  updateCategory(
    categoryData: CategoryUpdateReq
  ): Observable<CategoryUpdateRes> {
    return this.http.put<CategoryUpdateRes>(
      `${environment.apiUrl}/admin/service-category`,
      categoryData
    );
  }

  updateMainService(
    mainServiceData: MainServiceUpdateReq
  ): Observable<MainServiceUpdateRes> {
    return this.http.put<MainServiceUpdateRes>(
      `${environment.apiUrl}/admin/main-service`,
      mainServiceData
    );
  }

  updateSubService(
    subServiceData: SubServiceUpdateReq
  ): Observable<SubServiceUpdateRes> {
    return this.http.put<SubServiceUpdateRes>(
      `${environment.apiUrl}/admin/sub-service`,
      subServiceData
    );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/admin/service-category/${categoryId}`
    );
  }

  deleteMainService(mainServiceId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/admin/main-service/${mainServiceId}`
    );
  }

  deleteSubService(subServiceId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/admin/sub-service/${subServiceId}`
    );
  }
}
